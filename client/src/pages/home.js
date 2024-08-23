
import { NavLink } from "react-router-dom"
import fish from '../data/fish.png'
import mouse from '../data/mouse.png'
export default function Home() {


    return (
        <div className="cell">
        
        <div className="center">
            <h1 className="centerText">Database for Single Cell Senquencing</h1>

            <p>This database consisting of single cell RNA-seq data
            is provided by the Bioinformatics Lab at the Wilmer Eye Institute of Johns Hopkins University. 
            It visualizes gene expression levels and allows for evaluation of genes through the 
            Specificity and Coverage metrics.</p>

            
            <div style={{display : "flex", justifyContent: "center", alignItems:"center"}}>
                <h4>Species:&ensp;</h4>
                <div style={{display : "flex", flexDirection: "column"}}>
                <img src={fish} alt="Zebrafish"/>
                <p className="centerText">Zebrafish</p>
                </div>
                <div style={{display : "flex", flexDirection: "column"}}>
                <img src={mouse} alt="Mouse"/>
                <p className="centerText">Mouse (planned)</p>
                </div>
            </div>
            <h1 className="centerText">Summary</h1>
            <NavLink to= "/singleLookup" style={{fontWeight: "bold"}}>
            Single Gene Lookup
            </NavLink>
            {' '}is a search feature that provides expression levels for genes across multiple datasets.
            <br></br>
            <NavLink to= "/singleWeighted" style={{fontWeight: "bold"}}>
            Specificity/Coverage Lookup
            </NavLink>{' '} searches and returns genes with the highest weighted average of specificity
            and coverage, and includes gene expression visualization for each point.
            <h3 className="centerText">References</h3>
            
        </div>
        </div>
    )
}