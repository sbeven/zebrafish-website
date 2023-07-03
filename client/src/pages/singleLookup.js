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
        await fetch("/search?"+ new URLSearchParams({
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