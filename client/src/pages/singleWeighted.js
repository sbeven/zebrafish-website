import { useState  } from 'react';
import { Form } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

import ScatterGraph from '../scatterGraph';

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
    !== null ? sessionStorage.getItem("dataset") : "Zebrafish Retina")
    const [scatterData, setScatterData] = useState([])
    const [showRaw, setShowRaw] = useState(false)

    const validWeight = new RegExp("^[0-9]$|^[1-9][0-9]$|^(100)$|^$")
    const validNum = new RegExp("^[0-9]*$")



    const tissueTypes = ["Amacrine","Bipolar","Cone","Cornea","Horizontal","Muller Glia","RGC","Rod","RPE","Microglia"]
    const landscapeTypes = ['Cardiomyocyte', 'Endothelial cell', 
  'Enterocyte', 'Epithelial cell', 'Epithelial cell (Brain)', 
  'Erythrocyte', 'Erythrocyte (Liver)', 'Erythroid Progenitor cell', 
  'Fibroblast', 'Goblet cell', 'Granulocyte', 'Granulosa cell', 'Hatching Gland', 
  'Hepatocyte', 'Immune cell', 'Immune Progenitor cell', 'Intestinal Bulb cell', 
  'Ionocyte', 'Keratinocyte', 'Macrophage', 'Mesenchymal cell', 'Mesenchymal cell (Caudal Fin)', 
  'Mt-rich cell', 'Muscle cell', 'Nephron cell', 'Neural cell', 'Neural Progenitor cell', 
  'Neurosecretory cell', 'Oligodendrocyte', 'Oocyte', 'Osteoblast', 'Pancreatic cell', 
  'Pancreatic Macrophage', 'Primordial Germ cell', 'Radial Glia', 'Retinal cell', 'Retinal Cone cell', 
  'Retinal Pigment Epithelial cell', 'Smooth Muscle cell', 'Spermatocyte', 'T cell']

    const day3Types = ['Cardiomyocyte',
    'Endothelial cell',
    'Epithelial cell',
    'Epithelial cell (Brain)',
    'Erythrocyte',
    'Erythroid Progenitor cell',
    'Granulocyte',
    'Hepatocyte',
    'Immune Progenitor cell',
    'Intestinal Bulb cell',
    'Ionocyte',
    'Keratinocyte',
    'Macrophage',
    'Mesenchymal cell',
    'Mt-rich cell',
    'Muscle cell',
    'Nephron cell',
    'Neural cell',
    'Neural Progenitor cell',
    'Neurosecretory cell',
    'Oligodendrocyte',
    'Osteoblast',
    'Pancreatic cell',
    'Primordial Germ cell',
    'Radial Glia',
    'Retinal cell',
    'Retinal Cone cell',
    'Retinal Pigment Epithelial cell']

    const larvalTypes = ["cluster.1", "cluster.2", "cluster.3", "cluster.4", "cluster.5",
    "cluster.6","cluster.7","cluster.8","cluster.9","cluster.10","cluster.11",
    "cluster.12","cluster.13","cluster.14","cluster.15","cluster.16",
    "cluster.17","cluster.18","cluster.19","cluster.20","cluster.21","cluster.22",
    "cluster.23", "cluster.24", "cluster.25", "cluster.26", "cluster.27", "cluster.28", "cluster.29"]

    const innerEarTypes = ["Crista.SCs", "HCs", "Macula.SCs"]

    const ovaryTypes = ["cluster.Early_Meio", "cluster.Early_1", "cluster.Early_2", "cluster.Early_3",
        "cluster.Follicle_1", "cluster.Follicle_2", "cluster.Follicle_lhx9", "cluster.GSC.GC_Pro",
        "cluster.Late_Meio", "cluster.Macrophage", "cluster.Meio", "cluster.Neutrophils",
        "cluster.NK.like", "cluster.Stromal_csrp1b", "cluster.Stromal_cxcl12a",
        "cluster.Stromal_fgf24", "cluster.Stromal_scara3", "cluster.Stromal_tbx2b", "cluster.Theca",
        "cluster.Vasculature"]

    const IntestineTypes = ["Acinar1", "Acinar2", "Acinar3", "Best4_Otop2", "EC1", "EC2", "EC3",
        "EC4", "EC5", "Endocrine1", "Endocrine2", "Epidermis1", "Epidermis2", "Epidermis3",
        "Goblet_like", "Goblet1", "Goblet2", "Hepatocytes1", "Hepatocytes2", "Hepatocytes3",
        "Leukocytes1", "Leukocytes2", "LRE1", "LRE2", "Mesenchymal1", "Mesenchymal2", "Mesenchymal3",
        "Mesenchymal4", "Muscle", "Neuronal", "Progenitor_like1", "Progenitor_like2", "Tuft_like",
        "VascularEndothelial", "VascularSmoothMuscle"]

    const HindbrainTypes = ["DifferentiatingProgenitors_44hpf", "DorsalProgenitors_24hpf", "Epidermis",
        "FloorPlate", "GlialCells", "HeadMesenchymeAndEpidermis", "HindbrainNeurons", "ImmatureNeurons",
        "Mesendoderm_16hpf_24hpf", "NeuralCrest_16hpf", "NeuralCrest_24hpf_44hpf",
        "OticAndCranialGanglia", "OticVesicle", "PharyngealArches", "Progenitors_16hpf", "Vasculature",
        "VMP_24hpf"]

    const Telencephalon6dpfTypes = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
        "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
        "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
        "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
        "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
        "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
        "Subpallium_04", "Olfactory Bulb", "vHabenula", "Oligodendrocytes",
        "Epithelial/Endothelial Cells", "OPC", "Microglia", "Progenitor_02"]

    const TelencephalonTypes = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
        "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
        "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
        "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
        "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
        "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
        "Subpallium_04", "Olfactory Bulb", "vHabenula", "Oligodendrocytes",
        "Epithelial/Endothelial Cells", "OPC", "Microglia", "Progenitor_02"]

    const DevelopingRetinaTypes = ["Late RPCs", "Photoreceptor Precursor", "RGC", "Early RPCs",
        "Amacrine", "Muller Glia", "Horizontal", "Bipolar", "Photoreceptor"]

    const PairsDevelopingRetinaTypes = ["Late RPCs", "Photoreceptor Precursor", "RGC", "Early RPCs",
        "Amacrine", "Muller Glia", "Horizontal", "Bipolar", "Photoreceptor"]

    const PairsHindbrainTypes = ["Progenitors..16hpf", "Mesendoderm..16.24hpf", "Neural.Crest..24.44hpf",
        "Neural.Crest..16hpf", "Otic.Vesicle", "VMP..24hpf", "Differentiating.Progenitors..44hpf",
        "Floor.Plate", "Pharyngeal.Arches", "Hindbrain.Neurons", "Dorsal.Progenitors..24hpf",
        "Epidermis", "Immature.Neurons", "Glial.Cells", "Otic.and.Cranial.Ganglia.Neuron",
        "Vasculature", "Head.Mesenchyme...Epidermis..24.44hpf"]

    const PairsInnerEarTypes = ["HCs", "Macula.SCs", "Crista.SCs"]

    const PairsIntestineTypes = ["Epidermis.3", "Mesenchymal.2", "EC3", "Goblet.1", "Hepatocytes.1",
        "Vascular.Smooth.Muscle", "EC4", "EC1", "Best4.Otop2", "Hepatocytes.2", "Leukocytes.1",
        "EC2", "Endocrine.1", "Progenitor.like.2", "Acinar.3", "Acinar.2", "Progenitor.like.1",
        "Acinar.1", "EC5", "Neuronal", "LRE.1", "Goblet.like", "Vascular.Endothelial",
        "Endocrine.2", "Epidermis.1", "Hepatocytes.3", "Epidermis.2", "Mesenchymal.4",
        "Leukocytes.2", "Mesenchymal.1", "Tuft.like", "Goblet.2", "Muscle", "Mesenchymal.3",
        "LRE.2"]

    const PairsLandscape72hpfTypes = ["Keratinocyte", "Ionocyte", "Endothelial.cell", "Cardiomyocyte",
        "Epithelial.cell", "Pancreatic.cell", "Neural.cell", "Nephron.cell", "Mt.rich.cell",
        "Retinal.cell", "Osteoblast", "Erythrocyte", "Neural.progenitor.cell", "Immune.progenitor.cell",
        "Erythroid.progenitor.cell", "Epithelial.cell..Brain.", "Retinal.pigment.epithelial.cell",
        "Macrophage", "Mesenchymal.cell", "Neurosecretory.cell", "Radial.glia", "Muscle.cell",
        "Retinal.cone.cell", "Oligodendrocyte", "Granulocyte", "Hepatocyte", "Intestinal.bulb.cell",
        "T.cell", "Primordial.germ.cell", "Granulosa.cell", "Hatching.gland", "Enterocyte",
        "Mesenchymal.cell..caudal.fin.", "Goblet.cell"]

    const PairslarvalRGCTypes = ["cluster.1", "cluster.2", "cluster.3", "cluster.4", "cluster.5",
        "cluster.6", "cluster.7", "cluster.8", "cluster.9", "cluster.10", "cluster.11",
        "cluster.12", "cluster.13", "cluster.14", "cluster.15", "cluster.16",
        "cluster.17", "cluster.18", "cluster.19", "cluster.20", "cluster.21", "cluster.22",
        "cluster.23", "cluster.24", "cluster.25", "cluster.26", "cluster.27", "cluster.28", "cluster.29"]

    const PairsOvaryTypes = ["NK.like", "Follicle_1", "Theca", "Stromal_cxcl12a", "Follicle_2",
        "Macrophage", "Stromal_fgf24", "Early_OO_1", "Stromal_scara3", "Early_OO_3", "Vasculature",
        "Follicle_lhx9", "Stromal_tbx2b", "Neutrophils", "Stromal_csrp1b", "GSC.GC_Pro", "Meio",
        "Early_Meio", "Late_Meio", "Early_OO_2"]

    const PairsRetina6dpfTypes = ["Bipolar", "Amacrine", "Cones", "Horizontal", "RGCs", "RPCs",
        "ONL.progen", "Muller.Glia", "Melanocytes", "Rods", "N.A", "Cornea.Sclera", "RPE", "Lens",
        "Blood", "Microglia", "Keratinocytes"]

    const PairsTelencephalonTypes = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
        "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
        "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
        "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
        "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
        "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
        "Subpallium_04", "Olfactory.Bulb", "vHabenula", "Oligodendrocytes",
        "Epithelial/Endothelial.Cells", "OPC", "Microglia", "Progenitor_02"]

    const PairsTelencephalon6dpfTypes = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
        "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
        "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
        "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
        "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
        "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
        "Subpallium_04", "Olfactory.Bulb", "vHabenula", "Oligodendrocytes",
        "Epithelial/Endothelial.Cells", "OPC", "Microglia", "Progenitor_02"]

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
            if (newType === "Zebrafish Landscape") {
                setAndStoreTissueType(landscapeTypes[0])
            } else if (newType === "Zebrafish Retina") {
                setAndStoreTissueType(tissueTypes[0])
            } else if (newType === "Zebrafish Landscape Day 3") {
                setAndStoreTissueType(day3Types[0])
            } else if (newType === "Larval RGC") {
                setAndStoreTissueType(larvalTypes[0])
            } else if (newType === "Inner Ear 12mpf") {
                setAndStoreTissueType(innerEarTypes[0])
            } else if (newType === "Ovary 40dpf") {
                setAndStoreTissueType(ovaryTypes[0])
            } else if (newType === "Intestine 6dpf") {
                setAndStoreTissueType(IntestineTypes[0])
            } else if (newType === "Hindbrain 16hpf_24hpf_44hpf") {
                setAndStoreTissueType(HindbrainTypes[0])
            } else if (newType === "Telencephalon 6dpf") {
                setAndStoreTissueType(Telencephalon6dpfTypes[0])
            } else if (newType === "Telencephalon 6dpf_15dpf_adult") {
                setAndStoreTissueType(TelencephalonTypes[0])
            } else if (newType === "Developing Retina") {
                setAndStoreTissueType(DevelopingRetinaTypes[0])
            } else if (newType === "Pairs_Developing Retina") {
                setAndStoreTissueType(PairsDevelopingRetinaTypes[0])
            } else if (newType === "Pairs_Hindbrain") {
                setAndStoreTissueType(PairsHindbrainTypes[0])
            } else if (newType === "Pairs_Inner Ear") {
                setAndStoreTissueType(PairsInnerEarTypes[0])
            } else if (newType === "Pairs_Intestine") {
                setAndStoreTissueType(PairsIntestineTypes[0])
            } else if (newType === "Pairs_Landscape 72hpf") {
                setAndStoreTissueType(PairsLandscape72hpfTypes[0])
            } else if (newType === "Pairs_Larval RGC") {
                setAndStoreTissueType(PairslarvalRGCTypes[0])
            } else if (newType === "Pairs_Ovary 40dpf") {
                setAndStoreTissueType(PairsOvaryTypes[0])
            } else if (newType === "Pairs_Retina 6dpf") {
                setAndStoreTissueType(PairsRetina6dpfTypes[0])
            } else if (newType === "Pairs_Telencephalon") {
                setAndStoreTissueType(PairsTelencephalonTypes[0])
            } else if (newType === "Pairs_Telencephalon 6dpf") {
                setAndStoreTissueType(PairsTelencephalon6dpfTypes[0])
            }

            
        }
        sessionStorage.setItem("dataset", newType)
        setDataset(newType)
    }

    return (
        <div>
            <h1>Specificity/Coverage weighted lookup</h1>
            <p style={{margin: "0px"}}>Search for the top genes based on a weighted average of specificity and coverage.
                Click on a point to show expression percentages.</p>
            <div style={{ display: 'flex', alignItems: "center", margin: "5px 0px"}}>
            <p style={{ margin: "0px", padding: "0px 10px 0px 0px" }}>Set dataset</p>
            <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={dataset}>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Zebrafish Retina")} >Zebrafish Retina</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Zebrafish Landscape")} >Zebrafish Landscape</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Zebrafish Landscape Day 3")} >Zebrafish Landscape Day 3</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Larval RGC")} >Larval RGC</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Inner Ear 12mpf")} >Inner Ear 12mpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Ovary 40dpf")} >Ovary 40dpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Intestine 6dpf")} >Intestine 6dpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Hindbrain 16hpf_24hpf_44hpf")} >Hindbrain 16hpf_24hpf_44hpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Telencephalon 6dpf")} >Telencephalon 6dpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Telencephalon 6dpf_15dpf_adult")} >Telencephalon 6dpf_15dpf_adult</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Developing Retina")} >Developing Retina</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Developing Retina")} >Pairs_Developing Retina</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Hindbrain")} >Pairs_Hindbrain</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Inner Ear")} >Pairs_Inner Ear</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Intestine")} >Pairs_Intestine</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Landscape 72hpf")} >Pairs_Landscape 72hpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Larval RGC")} >Pairs_Larval RGC</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Ovary 40dpf")} >Pairs_Ovary 40dpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Retina 6dpf")} >Pairs_Retina 6dpf</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Telencephalon")} >Pairs_Telencephalon</Dropdown.Item>
                <Dropdown.Item onClick={() => setDatasetAndSelection("Pairs_Telencephalon 6dpf")} >Pairs_Telencephalon 6dpf</Dropdown.Item>
            </DropdownButton>
            <p style={{ margin: "0px", padding: "0px 10px 0px 10px" }}>Set tissue type</p>
                <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={tissueType}>
                    {dataset === "Zebrafish Retina" ? 
                    tissueTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    :(dataset === "Zebrafish Landscape" ? 
                    landscapeTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    :(dataset === "Larval RGC" ? 
                    larvalTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    :(dataset === "Inner Ear 12mpf" ?
                    innerEarTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    :(dataset === "Ovary 40dpf" ?
                    ovaryTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Intestine 6dpf" ?
                    IntestineTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Hindbrain 16hpf_24hpf_44hpf" ?
                    HindbrainTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Telencephalon 6dpf" ?
                    Telencephalon6dpfTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Telencephalon 6dpf_15dpf_adult" ?
                    TelencephalonTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Developing Retina" ?
                    DevelopingRetinaTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Developing Retina" ?
                    PairsDevelopingRetinaTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Hindbrain" ?
                    PairsHindbrainTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Inner Ear" ?
                    PairsInnerEarTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Intestine" ?
                    PairsIntestineTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Landscape 72hpf" ?
                    PairsLandscape72hpfTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Larval RGC" ?
                    PairslarvalRGCTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Ovary 40dpf" ?
                    PairsOvaryTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Retina 6dpf" ?
                    PairsRetina6dpfTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Telencephalon" ?
                    PairsTelencephalonTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    : (dataset === "Pairs_Telencephalon 6dpf" ?
                    PairsTelencephalon6dpfTypes.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>)
                    :day3Types.map(type => <Dropdown.Item key={type} onClick={() => setAndStoreTissueType(type)} >{type}</Dropdown.Item>))))))))))))))))))))}
                    
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
                Warning: numbers greater than 500 may cause lag</p> : null}
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
    )
}