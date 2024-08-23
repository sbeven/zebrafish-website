import React, { useState} from 'react';
import SearchBar from '../components/searchbar.js';
import BarGraph from '../components/barGraph.js';

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { dataLabels } from '../data/dataLabels.js';

export default function SingleLookup() {

    const [response, setResponse] = useState("")
    const [load, setLoad] = useState(false)
    const [searchWord, setSearchWord] = useState("")
    const [data, setData] = useState([])
    const [gene, setGene] = useState("")
    const [dataset, setDataset] = useState(sessionStorage.getItem("dataset1")
    !== null ? sessionStorage.getItem("dataset1") : "Zebrafish_Retina_6dpf")


    function setAndStoreDataset(dataset) {
        sessionStorage.setItem("dataset1", dataset)
        setDataset(dataset)
    }

    //api call set and get
    async function search() {
        setLoad(true)
        /* remember to change to /backend */
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
        <div className='cell'>
        <div className= "center">
        <h1>Gene Expression Lookup</h1>
        <p style={{margin: "0px"}}>Type a gene into the search bar e.g. si:ch73-252i11.1, rpl18a</p>
        <div style={{ display: 'flex', alignItems: "center", margin: "5px 0px"}}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set dataset</p>
                <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={dataset}>
                    {Object.keys(dataLabels).map(name => <Dropdown.Item onClick={() => setAndStoreDataset(name)} key={name}>{name}</Dropdown.Item>)}
                </DropdownButton>
            </div>
        <div id="searchbar" style={{display: "flex"}}>
        <SearchBar
                  loading={load} 
                  setWordFunc={setSearchWord} 
                  searchFunc={search}>
                  </SearchBar>
        <p className = "response">{response}</p>
        </div>
        <BarGraph  passedData={data} passedGene={gene} dataset={dataset}/>

        </div>

        </div>
    )
}