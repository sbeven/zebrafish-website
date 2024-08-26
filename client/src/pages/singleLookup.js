import React, { useState } from 'react';
import SearchBar from '../components/searchbar.js';
import BarGraph from '../components/barGraph.js';

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { dataLabels } from '../data/dataLabels.js';

export default function SingleLookup() {

    const [response, setResponse] = useState("")
    const [responseAvgExpr, setResponseAvgExpr] = useState("")
    const [load, setLoad] = useState(false)
    const [searchWord, setSearchWord] = useState("")
    const [data, setData] = useState([])
    const [avgExprData, setAvgExprData] = useState([])
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
        await fetch("/backend/search?" + new URLSearchParams({
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
                console.log(object)
                setData(object["data"])
                setGene(searchWord)
            }
        ).catch(
            (error) => {
                console.log(error)
                setResponse("Error: Gene does not exist")
            }
        )
        setLoad(false)
    }

    //api call set and get
    async function searchAvgExpr() {
        setLoad(true)
        await fetch("/backend/searchAvgExpr?" + new URLSearchParams({
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
                setResponseAvgExpr("")
                console.log(object)
                setAvgExprData(object["data"])
                setGene(searchWord)
            }
        ).catch(
            (error) => {
                console.log(error)
                setResponseAvgExpr("Error: Average Gene Expression does not exist")
            }
        )
        setLoad(false)
    }

    return (
        <div className='cell'>
            <div className="center" >
                <h1>Gene Expression Lookup</h1>
                <p style={{ margin: "0px" }}>Type a gene into the search bar e.g. si:ch73-252i11.1, rpl18a</p>
                <div style={{ display: 'flex', alignItems: "center", margin: "5px 0px" }}>
                    <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set dataset</p>
                    <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={dataset}>
                        {Object.keys(dataLabels).map(name => <Dropdown.Item onClick={() => setAndStoreDataset(name)} key={name}>{name}</Dropdown.Item>)}
                    </DropdownButton>
                </div>
                <div id="searchbar" style={{ display: "flex", backgroundColor: "white" }}>
                    <SearchBar
                        loading={load}
                        setWordFunc={setSearchWord}
                        searchFunc={() => { search(); searchAvgExpr() }}>
                    </SearchBar>


                </div>
            </div>
            <div style={{ display: "flex", width:"100%"}}>
                <div className='graph'>
                    <p className="response">{response}</p>
                    <BarGraph passedData={data} passedGene={gene} dataset={dataset} />
                </div>
                <div className='graph'>
                    <p className="response">{responseAvgExpr}</p>
                    <BarGraph passedData={avgExprData} passedGene={gene} dataset={dataset} optionalTitle='Average Gene Expression Level of ' avgExpr={true} />
                </div>
            </div>
        </div>
    )
}