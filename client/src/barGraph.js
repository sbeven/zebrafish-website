import { useEffect, useRef } from 'react';
// this is chart stuff
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const day3Labels = ['Cardiomyocyte',
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

  const landscapeLabels = ['Cardiomyocyte', 'Endothelial cell', 
  'Enterocyte', 'Epithelial cell', 'Epithelial cell (Brain)', 
  'Erythrocyte', 'Erythrocyte (Liver)', 'Erythroid Progenitor cell', 
  'Fibroblast', 'Goblet cell', 'Granulocyte', 'Granulosa cell', 'Hatching Gland', 
  'Hepatocyte', 'Immune cell', 'Immune Progenitor cell', 'Intestinal Bulb cell', 
  'Ionocyte', 'Keratinocyte', 'Macrophage', 'Mesenchymal cell', 'Mesenchymal cell (Caudal Fin)', 
  'Mt-rich cell', 'Muscle cell', 'Nephron cell', 'Neural cell', 'Neural Progenitor cell', 
  'Neurosecretory cell', 'Oligodendrocyte', 'Oocyte', 'Osteoblast', 'Pancreatic cell', 
  'Pancreatic Macrophage', 'Primordial Germ cell', 'Radial Glia', 'Retinal cell', 'Retinal Cone cell', 
  'Retinal Pigment Epithelial cell', 'Smooth Muscle cell', 'Spermatocyte', 'T cell']

  const larvalLabels = ["cluster.1", "cluster.2", "cluster.3", "cluster.4", "cluster.5",
  "cluster.6","cluster.7","cluster.8","cluster.9","cluster.10","cluster.11",
  "cluster.12","cluster.13","cluster.14","cluster.15","cluster.16",
  "cluster.17","cluster.18","cluster.19","cluster.20","cluster.21","cluster.22",
  "cluster.23","cluster.24","cluster.25","cluster.26","cluster.27","cluster.28","cluster.29"]

  const innerEarLabels = ["Crista.SCs", "HCs", "Macula.SCs"]

  const ovaryLabels = ["cluster.Early_Meio", "cluster.Early_1", "cluster.Early_2", "cluster.Early_3",
      "cluster.Follicle_1", "cluster.Follicle_2", "cluster.Follicle_lhx9", "cluster.GSC.GC_Pro",
      "cluster.Late_Meio", "cluster.Macrophage", "cluster.Meio", "cluster.Neutrophils",
      "cluster.NK.like", "cluster.Stromal_csrp1b", "cluster.Stromal_cxcl12a",
      "cluster.Stromal_fgf24", "cluster.Stromal_scara3", "cluster.Stromal_tbx2b", "cluster.Theca",
      "cluster.Vasculature"]
 
  const IntestineLabels = ["Acinar1", "Acinar2", "Acinar3", "Best4_Otop2", "EC1", "EC2", "EC3",
      "EC4", "EC5", "Endocrine1", "Endocrine2", "Epidermis1", "Epidermis2", "Epidermis3",
      "Goblet_like", "Goblet1", "Goblet2", "Hepatocytes1", "Hepatocytes2", "Hepatocytes3",
      "Leukocytes1", "Leukocytes2", "LRE1", "LRE2", "Mesenchymal1", "Mesenchymal2", "Mesenchymal3",
      "Mesenchymal4", "Muscle", "Neuronal", "Progenitor_like1", "Progenitor_like2", "Tuft_like",
      "VascularEndothelial", "VascularSmoothMuscle"]
   
  const HindbrainLabels = ["DifferentiatingProgenitors_44hpf", "DorsalProgenitors_24hpf", "Epidermis",
      "FloorPlate", "GlialCells", "HeadMesenchymeAndEpidermis", "HindbrainNeurons", "ImmatureNeurons",
      "Mesendoderm_16hpf_24hpf", "NeuralCrest_16hpf", "NeuralCrest_24hpf_44hpf",
      "OticAndCranialGanglia", "OticVesicle", "PharyngealArches", "Progenitors_16hpf", "Vasculature",
      "VMP_24hpf"]

  const Telencephalon6dpfLabels = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
      "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
      "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
      "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
      "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
      "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
      "Subpallium_04", "Olfactory Bulb", "vHabenula", "Oligodendrocytes",
      "Epithelial/Endothelial Cells", "OPC", "Microglia", "Progenitor_02"]

  const TelencephalonLabels = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
     "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
     "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
     "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
     "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
     "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
     "Subpallium_04", "Olfactory Bulb", "vHabenula", "Oligodendrocytes",
     "Epithelial/Endothelial Cells", "OPC", "Microglia", "Progenitor_02"]
 
  const DevelopingRetinaLabels = ["Late RPCs", "Photoreceptor Precursor", "RGC", "Early RPCs",
     "Amacrine",	"Muller Glia",	"Horizontal",	"Bipolar",	"Photoreceptor"]

  const PairsDevelopingRetinaLabels = ["Late RPCs", "Photoreceptor Precursor", "RGC", "Early RPCs",
     "Amacrine", "Muller Glia", "Horizontal", "Bipolar", "Photoreceptor"]
  
  const PairsHindbrainLabels = ["Progenitors..16hpf", "Mesendoderm..16.24hpf", "Neural.Crest..24.44hpf",
      "Neural.Crest..16hpf", "Otic.Vesicle", "VMP..24hpf", "Differentiating.Progenitors..44hpf",
      "Floor.Plate", "Pharyngeal.Arches", "Hindbrain.Neurons", "Dorsal.Progenitors..24hpf",
      "Epidermis", "Immature.Neurons", "Glial.Cells", "Otic.and.Cranial.Ganglia.Neuron",
      "Vasculature", "Head.Mesenchyme...Epidermis..24.44hpf"]

  const PairsInnerEarLabels = ["HCs", "Macula.SCs", "Crista.SCs"]

  const PairsIntestineLabels = ["Epidermis.3", "Mesenchymal.2", "EC3", "Goblet.1", "Hepatocytes.1",
      "Vascular.Smooth.Muscle", "EC4", "EC1", "Best4.Otop2", "Hepatocytes.2", "Leukocytes.1",
      "EC2", "Endocrine.1", "Progenitor.like.2", "Acinar.3", "Acinar.2", "Progenitor.like.1",
      "Acinar.1", "EC5", "Neuronal", "LRE.1", "Goblet.like", "Vascular.Endothelial",
      "Endocrine.2", "Epidermis.1", "Hepatocytes.3", "Epidermis.2", "Mesenchymal.4",
      "Leukocytes.2", "Mesenchymal.1", "Tuft.like", "Goblet.2", "Muscle", "Mesenchymal.3",
      "LRE.2"]

  const PairsLandscape72hpfLabels = ["Keratinocyte", "Ionocyte", "Endothelial.cell", "Cardiomyocyte",
      "Epithelial.cell", "Pancreatic.cell", "Neural.cell", "Nephron.cell", "Mt.rich.cell",
      "Retinal.cell", "Osteoblast", "Erythrocyte", "Neural.progenitor.cell", "Immune.progenitor.cell",
      "Erythroid.progenitor.cell", "Epithelial.cell..Brain.", "Retinal.pigment.epithelial.cell",
      "Macrophage", "Mesenchymal.cell", "Neurosecretory.cell", "Radial.glia", "Muscle.cell",
      "Retinal.cone.cell", "Oligodendrocyte", "Granulocyte", "Hepatocyte", "Intestinal.bulb.cell",
      "T.cell", "Primordial.germ.cell", "Granulosa.cell", "Hatching.gland", "Enterocyte",
      "Mesenchymal.cell..caudal.fin.", "Goblet.cell"]

  const PairslarvalRGCLabels = ["cluster.1", "cluster.2", "cluster.3", "cluster.4", "cluster.5",
      "cluster.6", "cluster.7", "cluster.8", "cluster.9", "cluster.10", "cluster.11",
      "cluster.12", "cluster.13", "cluster.14", "cluster.15", "cluster.16",
      "cluster.17", "cluster.18", "cluster.19", "cluster.20", "cluster.21", "cluster.22",
      "cluster.23", "cluster.24", "cluster.25", "cluster.26", "cluster.27", "cluster.28", "cluster.29"]

  const PairsOvaryLabels = ["NK.like", "Follicle_1", "Theca", "Stromal_cxcl12a", "Follicle_2",
      "Macrophage", "Stromal_fgf24", "Early_OO_1", "Stromal_scara3", "Early_OO_3", "Vasculature",
      "Follicle_lhx9", "Stromal_tbx2b", "Neutrophils", "Stromal_csrp1b", "GSC.GC_Pro", "Meio",
      "Early_Meio", "Late_Meio", "Early_OO_2"]

  const PairsRetina6dpfLabels = ["Bipolar", "Amacrine", "Cones", "Horizontal", "RGCs", "RPCs",
      "ONL.progen", "Muller.Glia", "Melanocytes", "Rods", "N.A", "Cornea.Sclera", "RPE", "Lens",
      "Blood", "Microglia", "Keratinocytes"]

  const PairsTelencephalonLabels = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
      "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
      "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
      "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
      "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
      "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
      "Subpallium_04", "Olfactory.Bulb", "vHabenula", "Oligodendrocytes",
      "Epithelial/Endothelial.Cells", "OPC", "Microglia", "Progenitor_02"]

  const PairsTelencephalon6dpfLabels = ["Subpallium_IN", "Progenitor_01", "dHabenula", "Subpallium_06",
      "Pallium_04", "Cycling progenitors_01", "Pallium_IN03", "Pallium_02", "Pallium_07",
      "Subpallium_01", "Subpallium_07", "PoA_01", "Pallium_IN01", "Pallium_05", "Subpallium_02",
      "Pallium_IN02", "Pallium_06", "Pallium_01", "Cycling progenitors_02", "Subpallium_08",
      "Committed_pallium_precursors", "PoA_02", "Pallium_09", "UnK", "Astrocytes", "Pallium_08",
      "Subpallium_05", "Pallium_03", "Subpallium_03", "Committed_subpallium_precursors",
      "Subpallium_04", "Olfactory.Bulb", "vHabenula", "Oligodendrocytes",
      "Epithelial/Endothelial.Cells", "OPC", "Microglia", "Progenitor_02"]

  const options = {
    indexAxis: 'y',
    scales: {
      y: {
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: 
       
        { 
          min:0,
          max:1,
          //shows percentages
          ticks: {
            callback: function (value) {
              return (value * 100).toFixed(0) + '%'; // convert it to percentage
            },
          },
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          // apparently you get passed in an object with all the info
          label: function (object) {
            return (object["raw"] * 100).toFixed(4) + '%'; // convert it to percentage
          }
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  
  const labels = ["Amacrine","Bipolar","Cone","Cornea","Horizontal","Muller Glia","RGC","Rod","RPE","Microglia"];
  
  var data = {
    labels: labels,
    
    datasets: [
      {
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
// ^^ this is chart stuff

export default function BarGraph({passedData, passedGene, dataset}) {
  const chartReference = useRef();
  useEffect(() => {
    const chart = chartReference.current
      if (dataset === "Zebrafish Landscape") {
          chart.data.labels = landscapeLabels
      } else if (dataset === "Zebrafish Retina") {
          chart.data.labels = labels
      } else if (dataset === "Zebrafish Landscape Day 3") {
          chart.data.labels = day3Labels
      } else if (dataset === "Larval RGC") {
          chart.data.labels = larvalLabels
      } else if (dataset === "Inner Ear 12mpf") {
          chart.data.labels = innerEarLabels
      } else if (dataset === "Ovary 40dpf") {
          chart.data.labels = ovaryLabels
      } else if (dataset === "Intestine 6dpf") {
          chart.data.labels = IntestineLabels
      } else if (dataset === "Hindbrain 16hpf_24hpf_44hpf") {
          chart.data.labels = HindbrainLabels
      } else if (dataset === "Telencephalon 6dpf") {
          chart.data.labels = Telencephalon6dpfLabels
      } else if (dataset === "Telencephalon 6dpf_15dpf_adult") {
          chart.data.labels = TelencephalonLabels
      } else if (dataset === "Developing Retina") {
          chart.data.labels = DevelopingRetinaLabels
      } else if (dataset === "Pairs_Developing Retina") {
          chart.data.labels = PairsDevelopingRetinaLabels
      } else if (dataset === "Pairs_Hindbrain") {
          chart.data.labels = PairsHindbrainLabels
      } else if (dataset === "Pairs_Inner Ear") {
          chart.data.labels = PairsInnerEarLabels
      } else if (dataset === "Pairs_Intestine") {
          chart.data.labels = PairsIntestineLabels
      } else if (dataset === "Pairs_Landscape 72hpf") {
          chart.data.labels = PairsLandscape72hpfLabels
      } else if (dataset === "Pairs_Larval RGC") {
          chart.data.labels = PairslarvalRGCLabels
      } else if (dataset === "Pairs_Ovary 40dpf") {
          chart.data.labels = PairsOvaryLabels
      } else if (dataset === "Pairs_Retina 6dpf") {
          chart.data.labels = PairsRetina6dpfLabels
      } else if (dataset === "Pairs_Telencephalon") {
          chart.data.labels = PairsTelencephalonLabels
      } else if (dataset === "Pairs_Telencephalon 6dpf") {
          chart.data.labels = PairsTelencephalon6dpfLabels
      }
      

    chart.data.datasets[0].data = []
    chart.options.plugins.title.text = ""
    chart.update()
  }, [dataset])

  useEffect(() => {
      const chart = chartReference.current
      chart.data.datasets[0].data = passedData
      if (passedGene !== "") {
        chart.options.plugins.title.text = "Gene Expression Percentage of " + passedGene
      } else {
        chart.options.plugins.title.text = ""
      }
      chart.update()
  }, [passedData, passedGene])
    return (

        <div className='graph' style={{ height: dataset === "Inner Ear 12mpf" || dataset === "Zebrafish Retina"? "400px" : "700px"}}>
    <Bar ref={chartReference}
    options={options} 
    data={data} />
        </div>
    )
   
}