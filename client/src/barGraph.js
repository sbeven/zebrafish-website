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

  const options = {
    indexAxis: 'y',
    scales: {
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
  
  const labels = ["Amacrine","Bipolar","Cone","Cornea","Horizontal","Müller Glia","RGC","Rod","RPE"];
  
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
    } else {
      chart.data.labels = labels

    }
    chart.data.datasets[0].data = []
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
    <div className='graph' style={{height: dataset === "Zebrafish Retina" ? "400px" : "820px"}}>
    <Bar ref={chartReference}
    options={options} 
    data={data} />
    </div>
    )
}