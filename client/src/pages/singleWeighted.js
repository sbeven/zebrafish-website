import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

import ScatterGraph from '../scatterGraph';

export default function SingleWeighted() {
    const [load, setLoad] = useState(false)
    const [tissueType, setTissueType] = useState("Amacrine")
    const [weight, setWeight] = useState(sessionStorage.getItem("weight") 
    !== null ? Number(sessionStorage.getItem("weight")) : 50)
    const [string, setString] = useState("")
    const [numGenes, setNumGenes] = useState(sessionStorage.getItem("numGenes") 
    !== null ? Number(sessionStorage.getItem("numGenes")) : 25)

    const [scatterData, setScatterData] = useState([])
    const validWeight = new RegExp("^[0-9]$|^[1-9][0-9]$|^(100)$|^$")
    const tissueTypes = ["Amacrine","Bipolar","Cone","Cornea","Horizontal","Müller Glia","RGC","Rod","RPE"]
    
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

    async function searchWeighted() {
        setLoad(true)
        await fetch("/searchWeighted?"+ new URLSearchParams({
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
                setScatterData(object)
            }
        ).catch(
            (error) => {
                console.log(error)}
        )
        setLoad(false)
    }


    return (
        <div>
            <h1>Specificity/Coverage weighted lookup (Retina)</h1>
            <p style={{margin: "0px"}}>Search for the top genes based on a weighted average of specificity and coverage.
                Click on a point to show expression percentages.</p>
            <div style={{ display: 'flex', alignItems: "center", margin: "5px 0px"}}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set tissue type</p>
                <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={tissueType}>
                    {tissueTypes.map(type => <Dropdown.Item key={type} onClick={() => setTissueType(type)} >{type}</Dropdown.Item>)}
                    
                </DropdownButton>
            </div>
            <div style={{ display: 'flex', alignItems: "center" }}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set coverage weight</p>
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
            
            <div style={{padding: "20px 0px 0px 0px", width:"400px" }}>
                <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Show the top {numGenes} genes</p>
                <Slider
                        style={{ margin: "0px 10px"}}
                        min={5} max = {100}
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

            <ScatterGraph passedData={scatterData}/>



        </div>
    )
}