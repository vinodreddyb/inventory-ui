import {Field, Form} from 'react-final-form';
import {Button} from "primereact/button";
import React, {useState} from "react";
import {Calendar} from "primereact/calendar";
import civilActions from "../../../actions/civilActions";
import {Slider} from "primereact/slider";
import {Badge} from "primereact/badge";

const StatusForm = ({initialValues, formSubmit: formSubmit, nodeData}) => {
    const onSubmit = (data, form) => {
        data['date']=civilActions.dateToYMD(data['date'])
        data['nodeId'] = nodeData.id
        console.log(JSON.stringify(data))
        formSubmit(data)
        form.restart();
    }
    const [percentage, setPercentage] = useState(0);

    return (
        <div className="grid">
            <div className="col-12">
                <Form onSubmit={onSubmit} initialValues={initialValues} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="p-fluid" noValidate>
                        <div className="formgrid grid">
                            <div className="field col-3">
                                <label htmlFor="date">Select Date</label>
                               {/* <Field name="date" render={({input, meta}) => (


                                    <Calendar id="date" name="" {...input}
                                              minDate={nodeData.startDate1}
                                              maxDate={nodeData.endDate1}
                                              dateFormat="yy-mm-dd"
                                              onChange={e => {
                                                  input.onChange(e.value)
                                              }}/>
                                )}/>*/}
                            </div>
                            <div className="field col-2 md:col-4">
                                <label htmlFor="date">Status</label>
                                <br/><br/>
                                <Field name="percentage" render={({input, meta}) => (

                                    <Slider id="percentage" value={percentage} min={0} max={100}
                                            {...input}
                                            onChange={e => {
                                                setPercentage(e.value)
                                                input.onChange(e.value)
                                            }} />

                                )}/>


                            </div>
                            <div className="field col-2 md:col-4">
                                <br/><br/>
                                <Badge value={`${percentage}%`} className="mr-2" severity="warning"></Badge>
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
