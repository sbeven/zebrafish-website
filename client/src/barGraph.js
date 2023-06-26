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
    labels,
    
    datasets: [
      {
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
// ^^ this is chart stuff

export default function BarGraph({passedData, passedGene}) {
  const chartReference = useRef();
   
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
    <div className='graph'>
    <Bar ref={chartReference}
    options={options} 
    data={data} />
    </div>
    )
}