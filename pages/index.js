import getConfig from 'next/config';
import {Button} from 'primereact/button';
import {Chart} from 'primereact/chart';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Menu} from 'primereact/menu';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ProductService} from '../demo/service/ProductService';
import {LayoutContext} from '../layout/context/layoutcontext';
import Link from 'next/link';
import civilActions from '../actions/civilActions';
import { useDispatch, useSelector } from 'react-redux';

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
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
    const {scurveData,pieData} = useSelector(state => state.civil)
    const mounted = useRef(false);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        if (!mounted.current) {
            // do componentDidMount logic
            dispatch(civilActions.getScurveGraph());
            dispatch(civilActions.getContractProgresPie());
            mounted.current = true;

        }

    }, [dispatch,scurveData,pieData])
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        let colors;
        colors=[];
        if(pieData.data) {
            for(let i=0;i<pieData.data.length;i++){
                colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
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
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [dispatch,pieData]);

    return (
        <div className="grid">

            <div className="col-12">
                <div className="card">
                    <h5>S-Curve Overview</h5>
                    <Chart  data={scurveData} options={lineOptions} />
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Activity Weightage </h5>
                    <Chart  type="pie" data={chartData} options={chartOptions} height={"40%"}  width={"50%"} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
