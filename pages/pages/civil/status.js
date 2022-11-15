import {Field, Form} from 'react-final-form';
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import React from "react";
import {Calendar} from "primereact/calendar";
import {InputNumber} from "primereact/inputnumber";
import {Knob} from "primereact/knob";

const StatusForm = ({initialValues, formSubmit: formSubmit, nodeId, fields}) => {
    const onSubmit = (data, form) => {

        console.log(JSON.stringify(data))
    }
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
                                              dateFormat="yy-mm-dd"
                                              onChange={e => {
                                                  input.onChange(e.value)
                                              }}/>
                                )}/>
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field name="percentage" render={({input, meta}) => (
                                    <Knob id="percentage"  min={0} max={100} step={10}
                                          {...input}
                                          onChange={e => {
                                        input.onChange(e.value)
                                    }} />

                                )}/>
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
