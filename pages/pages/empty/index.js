import React, {useState} from 'react';
import {Timeline} from "primereact/timeline";
import './timeline.module.css'
import {Card} from "primereact/card";
import {Badge} from "primereact/badge";
import {Chart} from "primereact/chart";
const EmptyPage = () => {
    const events2 = [
        '2020', '2021', '2022', '2023'
    ];
    const events1 = [
        { status: '10', date: '15/10', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: '20', date: '16/10', icon: 'pi pi-cog', color: '#673AB7' },
        { status: '30', date: '17/10', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: '40', date: '18/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '50', date: '19/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '', date: '20/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '', date: '21/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '', date: '22/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '', date: '23/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '', date: '24/10', icon: 'pi pi-check', color: '#607D8B' },
        { status: '', date: '25/10', icon: 'pi pi-check', color: '#607D8B' }


    ];

    const customizedConnector = (item) => {
        return (
            <div
                class="p-timeline-event-connector1"
                style="{ width: '4px', backgroundColor: slotProps.item.color }"
            ></div>
        );
    };
    const customizedMarker = (item) => {
        return (

            <Badge size={"large"} value={item.status} className="mr-2"></Badge>
        );
    };
    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                { item.image && <img src={`images/product/${item.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} width={200} className="shadow-1" />}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>

            </Card>
        );
    };
    const [basicData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: [10, 20, 30],
            }
        ]
    });

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
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                    <div className="timeline-demo">



                      </div>
                    <Chart type="bar" data={basicData} options={basicOptions} />
                </div>
            </div>
        </div>
    );
};

export default EmptyPage;
