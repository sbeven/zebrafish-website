import { useState  } from 'react';
import { Form } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { dataLabels } from '../data/dataLabels.js';
import ScatterGraph from '../components/scatterGraph.js';

export default function SingleWeighted() {
    const [load, setLoad] = useState(false)
    const [tissueType, setTissueType] = useState(sessionStorage.getItem("tissueType")
    !== null ? sessionStorage.getItem("tissueType") : "Amacrine")
    const [weight, setWeight] = useState(sessionStorage.getItem("weight") 
    !== null ? Number(sessionStorage.getItem("weight")) : 50)
    const [string, setString] = useState("")
    const [numGenes, setNumGenes] = useState(sessionStorage.getItem("numGenes") 
    !== null ? Number(sessionStorage.getItem("numGenes")) : 25)
    const [dataset, setDataset] = useState(sessionStorage.getItem("dataset")
    !== null ? sessionStorage.getItem("dataset") : "Zebrafish_Retina_6dpf")
    const [scatterData, setScatterData] = useState([])
    const [showRaw, setShowRaw] = useState(false)

    const validWeight = new RegExp("^[0-9]$|^[1-9][0-9]$|^(100)$|^$")
    const validNum = new RegExp("^[0-9]*$")


//i want to save values for reload
    function changeWeight(val) {
        if (validWeight.test(val)) {
            if (val === "") {
                setWeight(0)
            } else {
                setWeight(Number(val))
            }
            setString(val)
            sessionStorage.setItem("weight", val);
        } 
    }
//i want to save values for reload 
    function setAndStoreTissueType(type) {
        sessionStorage.setItem("tissueType", type)
        setTissueType(type)
    }



    async function searchWeighted() {
        setLoad(true)
        // change to backend for actual
        await fetch("/backend/searchWeighted?"+ new URLSearchParams({
            dataset: dataset,
            tissue: tissueType,
            weight: weight,
            number: numGenes
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
                console.log(object)
                setScatterData(object)
            }
        ).catch(
            (error) => {
                console.log(error)}
        )
        setLoad(false)
    }
    //make sure the tissue type choices line up with the dataset type choice
    function setDatasetAndSelection(newType) {

        if (dataset !== newType) {
            setAndStoreTissueType(dataLabels[newType][0])
        }
        sessionStorage.setItem("dataset", newType)
        setDataset(newType)
    }

    return (
        <div className='cell'>
            <div className="center">
            <h1>Specificity/Coverage weighted lookup</h1>
            <p style={{margin: "0px"}}>Search for the top genes based on a weighted average of specificity and coverage.
                Click on a point to show expression levels.</p>
            <div style={{ display: 'flex', alignItems: "center", margin: "5px 0px"}}>
            <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set dataset</p>
            <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={dataset}>
                {Object.keys(dataLabels).map(name => <Dropdown.Item onClick={() => setDatasetAndSelection(name)} key={name}>{name}</Dropdown.Item>)}
            </DropdownButton>
            <p style={{ margin: "0px", padding: "0px 10px 0px 10px" }}>Set tissue type</p>
                <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={tissueType}>
                    {dataLabels[dataset].map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)}
                </DropdownButton>
            </div>
            


            <div style={{ display: 'flex', alignItems: "center" }}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set coverage weight:</p>
                <Form.Control
                    value={string}
                    style={{ width: "40px", padding: "0px 5px" }}
                    onChange={(e) => changeWeight(e.target.value)}
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    margin="auto"
                />
            </div>
            <div className='sliderWrapper'
                style={{ width: "400px", display: "flex", alignItems: "center" }}>
                <div className='sliderText' >
                    Coverage <br />
                    {weight}%
                </div>

                <div style={{ padding: "10px", flexGrow: "1" }}>
                    <Slider
                        style={{ padding: "0px 0px" }}
                        onChange={(e) => {setWeight(e.target.value); setString(""); sessionStorage.setItem("weight", e.target.value);}}
                        value={weight} aria-label="Default" />
                </div>
                <div className='sliderText' >
                    Specificity<br />
                    {100 - weight}%
                </div>
            </div>
            



            <div style={{padding: "20px 0px 0px 0px" }}>
                <div style={{display:'flex', alignItems: "center" }}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Show the top </p>
                <Form.Control
                    value={numGenes}
                    style={{ width: "60px", padding: "0px 5px" }}
                    onChange={(e) => {if (validNum.test(e.target.value)) {setNumGenes(Number(e.target.value)); 
                        sessionStorage.setItem("numGenes", Number(e.target.value))}}}
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    margin="auto"
                />
                <p style={{ margin: "0px", padding: "0px 10px 0px 10px" }}> genes</p>
                </div>
                {numGenes > 500 ? <p> 
                Warning: numbers greater than 500 may cause buffering</p> : null}
                {/* theres some weird date formatting going on in cone at num=144 50%, 2 genes have the name 3/1/2023 that get
                converted to 1-Mar, and it causes errors*/}
                <Slider
                        style={{ margin: "0px 10px", width:"400px"}}
                        min={1} max = {500}
                        onChange={(e) => {setNumGenes(e.target.value); 
                        sessionStorage.setItem("numGenes", e.target.value)}}
                        value={numGenes} aria-label="Default" />
            </div>


            
            <div style={{width: "400px"}}>
            {/* Dont really know why but this works, like centering for img */}
            <Button style={{  display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"}}
                disabled={load}
                variant="outline-primary"
                onClick={() => searchWeighted()}>
                Search
            </Button>
            </div>
            </div>
            <div style={{backgroundColor: "rgb(255, 255, 255)", padding: "10px 10px 50px 10px"}}>
            <ScatterGraph passedData={scatterData} passedDataset={dataset}/>
            
            <Button 
                variant="outline-primary"
                onClick={() => setShowRaw(!showRaw)}>
                {showRaw ? "Hide raw data" : "Show raw data" }
            </Button>
            {/* I can't fix this issue where text goes past the p block for no reason*/}
            {showRaw ? 
            <div>
            <p>Raw scatter plot data:</p>
            <p style={{overflow: "auto"}}>{JSON.stringify(scatterData)}</p>
            </div>
            : null}
            </div>
        </div>
    )
}