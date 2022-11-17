import {Field, Form} from 'react-final-form';
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import React, {useEffect, useRef, useState} from "react";
import {Calendar} from "primereact/calendar";
import {InputNumber} from "primereact/inputnumber";
import {Knob} from "primereact/knob";
import {useDispatch, useSelector} from "react-redux";
import civilActions from "../../../actions/civilActions";
import {Chart} from "primereact/chart";
import {Slider} from "primereact/slider";
import {Badge} from "primereact/badge";

const StatusForm = ({initialValues, formSubmit: formSubmit, nodeData}) => {
    const dispatch = useDispatch();
    const onSubmit = (data, form) => {

        console.log(JSON.stringify(data))
    }
    const [value2, setValue2] = useState(0);

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
                    color: '#495057'
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
                <Form onSubmit={onSubmit} initialValues={initialValues} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="p-fluid" noValidate>
                        <div className="formgrid grid">
                            <div className="field col-3">
                                <label htmlFor="date">Select Date</label>
                                <Field name="date" render={({input, meta}) => (


                                    <Calendar id="date" name="" {...input}
                                              minDate={nodeData.startDate}
                                              maxDate={nodeData.endDate}
                                              dateFormat="yy-mm-dd"
                                              onChange={e => {
                                                  input.onChange(e.value)
                                              }}/>
                                )}/>
                            </div>
                            <div className="field col-2 md:col-4">
                                <label htmlFor="date">Status</label>
                                <br/><br/>
                                <Field name="percentage" render={({input, meta}) => (

                                    <Slider id="percentage" value={value2} min={0} max={100} step={10}
                                          {...input}
                                          onChange={e => {
                                              setValue2(e.value)
                                           input.onChange(e.value)
                                    }} />

                                )}/>


                            </div>
                            <div className="field col-2 md:col-4">
                                <br/><br/>
                                <Badge value={`${value2}%`} className="mr-2" severity="warning"></Badge>
                            </div>
                        </div>

                        <Button type="submit" label="Save" className="mt-2"/>
                    </form>
                )}/>
            </div>
        </div>
    );
}

export default StatusForm
