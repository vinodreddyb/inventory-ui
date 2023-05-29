import getConfig from 'next/config';
import {Chart} from 'primereact/chart';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {LayoutContext} from '../layout/context/layoutcontext';
import civilActions from '../actions/civilActions';
import {useDispatch, useSelector} from 'react-redux';
import { ProgressBar } from 'primereact/progressbar';

const lineData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Nov','Dec'],
    datasets: [
        {
            label: 'Monthly Progress',
            data: [16,8.7,10.2,7.6,7.2,7.9,8.2,9.5,7.6],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Cumulative Progress',
            data: [18.1,26.8,37.0,44.6,51.9,59.8,67.9,77.4,85.0],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const HorizontalBardata = {
    labels: ['RCC Superstructure', 'Supply of Materials', 'Fixing of Reinforcement Steel', 'Cladding Works', 'Form work', 'RCC Substructure', 'Brickwork & Stone Masonry', 'Misc. & Finishing', 'Glazing', 'Earth filling'
],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        
        {
            label: 'My Second dataset',
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};


function Dashboard() {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    position: "Right",
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const dispatch = useDispatch();
    const { scurveData, pieData } = useSelector(state => state.civil);
    const mounted = useRef(false);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        if (!mounted.current) {
            // do componentDidMount logic
            dispatch(civilActions.getScurveGraph());
            dispatch(civilActions.getContractProgresPie());
            mounted.current = true;

        }

    }, [dispatch, scurveData, pieData]);
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        let colors;
        colors = [];
        if (pieData.data) {
            for (let i = 0; i < pieData.data.length; i++) {
                colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
            }
        }

        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: pieData.labels,
            datasets: [
                {
                    data: pieData.data,
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }
            ]
        };

        const Bardata = {
            labels: pieData.labels,
            datasets: [
                {
                    data: pieData.data,
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }
            ]
        };

        /*pie Chart Options*/
        const options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: "#000",
                        fontSize: 12,
                        boxWidth: 12,
                        usePointStyle: true,
                        formatter: function (value, context) {
                            return context.dataIndex + ': ' + Math.round(value * 100) + '%';

                        }
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [dispatch, pieData]);

    return (
        <div className="card">
            <div className="grid">

                <div className="col-12">
                    <div className="card">
                        <div className="card-header text-center">
                            <h5>EXTERNAL DEVELOPMENT WORKS FOR DATA CENTRE COMPLEX(S-Curve)</h5>
                            <Chart data={scurveData} options={{
                                scales: {
                                    y: {
                                        type: 'linear',
                                        display: true,
                                        position: 'left',
                                    },
                                    y1: {
                                        type: 'linear',
                                        display: true,
                                        position: 'right',
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 2,
                                            callback: function (value, index, values) {
                                                // customize the format of the labels
                                                return value + ' %';
                                            }
                                        }
                                    }
                                }
                            }} />


                        </div>
                    </div>

                </div>

                <div>

                </div>
                <div className="col-12 xl:col-6">
                    <div className="card">
                        <div className="card" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <h5 style={{ textAlign: "center" }}> ACTIVITY WEIGHTAGE </h5>
                            <Chart
                                type="pie"
                                data={chartData}
                                options={chartOptions}
                                height={"60%"}
                                width={"100%"} />
                        </div>
                    </div>
                </div>

                <div className="col-12 xl:col-6">
                    <div className="card">
                        <div className="card" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <h5> Monthly vs Cumulative </h5>
                            <Chart type="line" data={lineData} options={chartOptions} height={"60%"}
                                width={"100%"} />
                        </div>
                    </div>
                </div>

                <div >
            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '30%' }}>
                    <h5>Mobilisation</h5>
                    <ProgressBar value={50} />
                </div>
                <div style={{ width: '30%' }}>
                    <h5>Supply of Materials</h5>
                    <ProgressBar value={60} />
                </div>
                <div style={{ width: '30%' }}>
                    <h5>Excavation</h5>
                    <ProgressBar value={80} />
                </div>
                <div style={{ width: '30%' }}>
                    <h5>Earth filling</h5>
                    <ProgressBar value={80} />
                </div>
                <div style={{ width: '30%' }}>
                    <h5>PCC</h5>
                    <ProgressBar value={30} />
                </div>
                <div style={{ width: '30%' }}>
                    <h5>Fixing of Reinforcement Steel</h5>
                    <ProgressBar value={45} />
                </div>
            </div>
        </div>

            </div>
        </div>

    );
}


/*const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = Math.round((value / sum) * 100) + '%';
            return percentage;
          } else {
            return percentage;
          }
        },
        color: '#fff'
      }
    }
  };*/

  // ...


export default Dashboard;
