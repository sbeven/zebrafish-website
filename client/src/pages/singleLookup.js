import React, { useState} from 'react';
import SearchBar from '../searchbar';
import BarGraph from '../barGraph';

import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function SingleLookup() {

    const [response, setResponse] = useState("")
    const [load, setLoad] = useState(false)
    const [searchWord, setSearchWord] = useState("")
    const [data, setData] = useState([])
    const [gene, setGene] = useState("")
    const [dataset, setDataset] = useState(sessionStorage.getItem("dataset")
    !== null ? sessionStorage.getItem("dataset") : "Zebrafish Retina")


    function setAndStoreDataset(dataset) {
        sessionStorage.setItem("dataset", dataset)
        setDataset(dataset)
    }

    //api call set and get
    async function search() {
        setLoad(true)
        await fetch("/backend/search?"+ new URLSearchParams({
            gene: searchWord,
            dataset: dataset
        })).then(
                res => {
                    if (!res.ok) {
                        throw Error();
                    } else {
                        return res.json() 
                    }
                    
                }
                
        ).then(
            object => {
                setResponse("")
                console.log(object["data"])
                setData(object["data"])
                setGene(searchWord)
            }
        ).catch(
            (error) => {
                console.log(error)
            setResponse("Error: Gene does not exist")}
        )
        setLoad(false)
    }

    return (
        <div id="page">
        <h1>Zebrafish Gene Expression Lookup</h1>
        <p style={{margin: "0px"}}>Type a gene into the search bar e.g. si:ch73-252i11.1, rpl18a</p>
        <div style={{ display: 'flex', alignItems: "center", margin: "5px 0px"}}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set dataset</p>
                <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={dataset}>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Zebrafish Retina")} >Zebrafish Retina</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Zebrafish Landscape")} >Zebrafish Landscape</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Zebrafish Landscape Day 3")} >Zebrafish Landscape Day 3</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Larval RGC")} >Larval RGC</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Inner Ear 12mpf")} >Inner Ear 12mpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Ovary 40dpf")} >Ovary 40dpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Intestine 6dpf")} >Intestine 6dpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Hindbrain 16hpf_24hpf_44hpf")} >Hindbrain 16hpf_24hpf_44hpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Telencephalon 6dpf")} >Telencephalon 6dpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Telencephalon 6dpf_15dpf_adult")} >Telencephalon 6dpf_15dpf_adult</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Developing Retina")} >Developing Retina</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Developing Retina")} >Pairs_Developing Retina</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Hindbrain")} >Pairs_Hindbrain</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Inner Ear")} >Pairs_Inner Ear</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Intestine")} >Pairs_Intestine</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Landscape 72hpf")} >Pairs_Landscape 72hpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Larval RGC")} >Pairs_Larval RGC</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Ovary 40dpf")} >Pairs_Ovary 40dpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Retina 6dpf")} >Pairs_Retina 6dpf</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Telencephalon")} >Pairs_Telencephalon</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAndStoreDataset("Pairs_Telencephalon 6dpf")} >Pairs_Telencephalon 6dpf</Dropdown.Item>
                </DropdownButton>
            </div>
        <div id="searchbar">
        <SearchBar
                  loading={load} 
                  setWordFunc={setSearchWord} 
                  searchFunc={search}>
                  </SearchBar>
        </div>
        <p className = "response">{response}</p>

        <BarGraph passedData={data} passedGene={gene} dataset={dataset}/>
        </div>
        
    )
}