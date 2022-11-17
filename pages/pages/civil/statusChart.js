import React from "react";
import {Chart} from "primereact/chart";
import {ProgressBar} from "primereact/progressbar";

const StatusChart = ({data,node}) => {

    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
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
                    color: '#495057',
                    min: 0,
                    max: 100,
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
            </div>
            <div className="col-12">
                <h5>Total Work progress</h5>
                <ProgressBar value={Math.max.apply(null,data.datasets[0].data)}></ProgressBar>
            </div>
            <div className="col-12">
                <h5>Day wise progress</h5>
                <Chart type="bar"  data={data} options={basicOptions} />
            </div>

        </div>
    );
}

export default StatusChart
