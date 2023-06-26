
import { useEffect, useRef, useState} from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,

} from 'chart.js';
import { Scatter} from 'react-chartjs-2';

import BarGraph from './barGraph';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        point: {
            pointRadius: 5,
            hoverRadius: 7
        }
    },
    scales: {
        x: {
            min:0,
            max:1,
            title: {
                display:true,
                text: "Coverage"
            },
            
            ticks: {
                callback: function (value) {
                  return (value * 100).toFixed(0) + '%'; // convert it to percentage
                },
              },
        },
        y: {
            min:0,
            max: 1,
            title: {
                display:true,
                text: "Specificity"
            },
            ticks: {
                callback: function (value) {
                  return (value * 100).toFixed(0) + '%'; // convert it to percentage
                },
              },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
              // apparently you get passed in an object with all the info
              label: function (object) {
                return [object["raw"].data, "Coverage: " + (object["raw"].x * 100).toFixed(2) + "%", 
                "Specificity: " + (object["raw"].y * 100).toFixed(2) + "%"]
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
    }
};

const data = {
datasets: [
    {
    label: 'Gene',
    data: [],
    backgroundColor: 'rgba(255, 99, 132, 1)',
    },
],
};


export default function ScatterGraph({passedData}) {

    const [barData, setBarData] = useState([])
    const [gene, setGene] = useState("")
    const chartReference = useRef();
    // this is straight up copypaste
    
    async function search(gene) {
        await fetch("/search?"+ new URLSearchParams({
            query: gene
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
                setBarData(object["data"])
                setGene(gene)
            }
        ).catch(
            (error) => {
                console.log(error)}
        )
    }

    const onClick = (event) => {
        const chart = chartReference.current
    
        if (!chart) {
          return;
        }
        
        const element = chart.getElementsAtEventForMode(event, 'point', { intersect: true }, false);
        if (element.length === 0) {
            return
        }
        const { datasetIndex, index } = element[0];
        const point = chart.data.datasets[datasetIndex].data[index]
        search(point.data)
      };

    useEffect(() => {
        const chart = chartReference.current
        chart.data.datasets[0].data = passedData
        if (passedData.length !== 0) {
            chart.options.plugins.title.text = "Top " + passedData.length + " Genes"
        } else {
            chart.options.plugins.title.text = ""
        }
        
        chart.update()
    }, [passedData])


    
    return (
        <div style={{ display: 'flex', flexWrap: "wrap"}}>
        <div className='graph'>
            <Scatter ref={chartReference} options={options} data={data} onClick={onClick} />
        </div> 
        <br/>
        <BarGraph passedData={barData} passedGene={gene}/>
        </div>
    )
    
}