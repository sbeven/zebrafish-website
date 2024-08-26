
import { useEffect, useRef, useState } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,

} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { dataLabels } from '../data/dataLabels.js';
import BarGraph from './barGraph';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    elements: {
        point: {
            pointRadius: 4,
            hoverRadius: 6
        }
    },
    scales: {
        x: {
            min: 0,
            max: 1,
            title: {
                display: true,
                text: "Coverage"
            },

            ticks: {
                callback: function (value) {
                    return (value * 100).toFixed(0) + '%'; // convert it to percentage
                },
            },
        },
        y: {
            min: 0,
            max: 1,
            title: {
                display: true,
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


export default function ScatterGraph({ passedData, passedDataset }) {

    const [barData, setBarData] = useState([])
    const [gene, setGene] = useState("")
    const chartReference = useRef();
    const [localDataset, setLocalDataset] = useState(sessionStorage.getItem("localDataset")
        !== null ? sessionStorage.getItem("localDataset") : "Zebrafish_Retina_6dpf")
    const [localBarData, setLocalBarData] = useState([])
    // this is straight up copypaste

    async function search(gene) {

        await fetch("/backend/search?" + new URLSearchParams({
            gene: gene,
            dataset: passedDataset
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
                console.log(object["data"])
                setBarData(object["data"])
                setGene(gene)
                searchLocal(gene)

            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }


    // copypaste search second bar graph
    async function searchLocal(gene) {
        await fetch("/backend/search?" + new URLSearchParams({
            gene: gene,
            dataset: localDataset
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
                console.log(object["data"])
                setLocalBarData(object["data"])
                setGene(gene)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }
    const setAndStoreLocalDataset = (dataset) => {
        if (dataset !== localDataset) {
            setLocalBarData([])
            setLocalDataset(dataset)
            sessionStorage.setItem("localDataset", dataset)
        }
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


    // when we update the local dataset do a new search on the third graph

    useEffect(() => {

        searchLocal(gene)
        // this disables the warning i get
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localDataset])


    //update data
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


    //update when change dataset
    useEffect(() => {
        const chart = chartReference.current
        chart.data.datasets[0].data = []
        chart.options.plugins.title.text = ""
        chart.update()

        // reset graphs if we're switching to a new search
        setBarData([])
        setLocalBarData([])
        setGene("")
    }, [passedDataset])




    return (
        <div>

            <div style={{ display: 'flex', flexWrap: "nowrap" }}>
                <div className='graph' style={{ height: "400px" }}>
                    <Scatter ref={chartReference} options={options} data={data} onClick={onClick}
                    />
                </div>
                <br />
                <BarGraph passedData={barData} passedGene={barData.length === 0 ? "" : gene + " in " + passedDataset} dataset={passedDataset} />
                <div className='graph'>
                    <div style={{ display: "flex" }}>
                        <p style={{ margin: "0px", padding: "3px 10px 0px 0px", marginLeft: "auto" }}>View gene in another dataset</p>
                        <DropdownButton size='sm' variant="outline-primary" id="dropdown-basic-button" title={localDataset}>
                            {Object.keys(dataLabels).map(name => <Dropdown.Item onClick={() => setAndStoreLocalDataset(name)} key={name}>{name}</Dropdown.Item>)}
                        </DropdownButton>
                    </div>
                    <BarGraph passedData={localBarData} passedGene={localBarData.length === 0 ? "" : gene + " in " + localDataset} dataset={localDataset} />
                </div>

            </div>
        </div>
    )

}