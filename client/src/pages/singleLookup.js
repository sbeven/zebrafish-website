import React, { useState} from 'react';
import SearchBar from '../searchbar';
import BarGraph from '../barGraph';


export default function SingleLookup() {

    const [response, setResponse] = useState("")
    const [load, setLoad] = useState(false)
    const [searchWord, setSearchWord] = useState("")
    const [data, setData] = useState([])
    const [gene, setGene] = useState("")

    //api call set and get
    async function search() {
        setLoad(true)
        await fetch("/search?"+ new URLSearchParams({
            query: searchWord
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
        <p>Type a gene into the search bar e.g. si:ch73-252i11.1, rpl18a</p>
        <div id="searchbar">
        <SearchBar
                  loading={load} 
                  setWordFunc={setSearchWord} 
                  searchFunc={search}>
                  </SearchBar>
        </div>
        <p className = "response">{response}</p>

        <BarGraph passedData={data} passedGene={gene}/>
        </div>
        
    )
}