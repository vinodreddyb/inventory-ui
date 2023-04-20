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
                min: 0,
                max: 100,
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef',
                    min: 0,
                    max: 100,
                }
            }
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
            </div>
            <div className="col-12">
               {/* <h5>Total Work progress</h5>
                {data.datasets1? <ProgressBar value={Math.max.apply(null,data.datasets1[0].data)}/>:<span/>}
*/}
            </div>
            <div className="col-12">
                <h5>Day wise progress</h5>
                <Chart type="bar"  data={data} options={basicOptions} />
            </div>

        </div>
    );
}

export default StatusChart
