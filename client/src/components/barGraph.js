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
import { dataLabels } from '../data/dataLabels.js'
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
    y: {
      ticks: {
        font: {
          size: 10
        }
      }
    },
    x:

    {
      min: 0,
      max: 1,
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

const labels = ["Amacrine", "Bipolar", "Cone", "Cornea", "Horizontal", "Muller Glia", "RGC", "Rod", "RPE", "Microglia"];

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

export default function BarGraph({ passedData, passedGene, dataset }) {
  const chartReference = useRef();
  useEffect(() => {
    const chart = chartReference.current
    chart.data.labels = dataLabels[dataset]


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
      chart.options.plugins.title.text = "No Data"
    }
    chart.update()
  }, [passedData, passedGene])
  return (

    <div className='graph' style={{ height: dataset === "Zebrafish_InnerEar_12m" || dataset === "Zebrafish_Retina_6dpf" ? "400px" : "700px" }}>
      <Bar ref={chartReference}
        options={options}
        data={data} />
    </div>
  )

}