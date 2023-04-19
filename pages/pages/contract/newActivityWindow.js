import {Field, Form} from 'react-final-form';
import React, {useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {Calendar} from "primereact/calendar";
import {Toast} from "primereact/toast";
import {InputSwitch} from "primereact/inputswitch";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";

const NewActivityForm = ({initialValues, formSubmit: formSubmit, nodeId, fields}) => {

    const toast = useRef(null);


    const onSubmit = (data, form) => {
        if (data['startDate'] instanceof Date && !isNaN(data['startDate'])) {
            data['startDate'] = dateToYMD(data['startDate'])
        }
        if (data['finishDate'] instanceof Date && !isNaN(data['finishDate'])) {
            data['finishDate'] = dateToYMD(data['finishDate'])
        }
        if (!isNaN(data['type'])) {
            data['type'] = data['type'].code
        }

        formSubmit(data)
        form.restart();
    };

    function dateToYMD(date) {
        const d = date.getDate();
        const m = date.getMonth() + 1; //Month from 0 to 11
        const y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    useEffect(() => {


    }, [])

    function getFields(item) {
        return <div className="formgrid grid" key={item.group}>
            <Toast ref={toast}/>
            {item.fields.filter(field => field.name !== 'name').map((field) => {
                return (
                    <Field name={`${item.group}-${field.name}`} key={`${item.group}-${field.name}`} render={({input, meta}) => (
                        <div className="field col" key={`${item.group}-${field.name}`}>

                            <label htmlFor={`${item.group}-${field.name}`}>{field.label}</label>
                            {(() => {
                                switch (field.type) {

                                    case "InputText":
                                        return <InputText id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}   {...input}/>

                                    case "InputNumber":
                                        switch (field.attributes.mode) {
                                            case "currency" :
                                                return (<InputNumber id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}
                                                                     {...input}
                                                                     onChange={e => {
                                                                         input.onChange(e.value)
                                                                     }}
                                                                     mode="currency" currency={field.attributes.currency} locale={field.attributes.locale}/>)
                                            case "decimal" :
                                                return (<InputNumber id={`${item.group}-${field.name}`}
                                                                     {...input}
                                                                     minFractionDigits={1} maxFractionDigits={2}
                                                                     suffix="%"
                                                                     onChange={e => {
                                                                         input.onChange(e.value)
                                                                     }}
                                                />)
                                            default :
                                                return (<InputNumber id={`${item.group}-${field.name}`}
                                                                     {...input}
                                                                     onChange={e => {
                                                                         input.onChange(e.value)
                                                                     }}
                                                />)
                                        }
                                    case "Calendar":
                                        return (<Calendar id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`} {...input}
                                                          dateFormat="yy-mm-dd"
                                                          onChange={e => {
                                                              input.onChange(e.value)
                                                          }}/>)
                                    case "InputSwitch":
                                        return (<React.Fragment><br/><InputSwitch id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}
                                                                                  checked={initialValues[`${item.group}-${field.name}`] === 'TENDER'}
                                                                                  onChange={e => {
                                                                                      input.onChange(e.value)
                                                                                      if (e.value) {
                                                                                          console.log(e.value)
                                                                                          initialValues[`${item.group}-${field.name}`] = "TENDER"
                                                                                      } else {
                                                                                          initialValues[`${item.group}-${field.name}`] = "NON-TENDER"
                                                                                      }
                                                                                  }}

                                        /></React.Fragment>)
                                    case "InputTextarea":
                                        return <InputTextarea id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`} {...input} autoResize/>
                                    default:
                                        return <InputText id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}   {...input}/>
                                }
                            })()}


                        </div>
                    )}/>

                )
            })}
        </div>;
    }

    const schTypes = [
        {name: 'Schedule', code: 'Sch.'},
        {name: 'Actual', code: 'Act.'},

    ];
    return (
        <div className="card">

            <Form onSubmit={onSubmit} initialValues={initialValues} render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="p-fluid" noValidate>
                    <div className="p-fluid formgrid grid">
                        <Field name="activity" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Activity</label>
                                <InputText id="activity" name="activity"   {...input}/>
                            </div>)}/>
                        <Field name="unit" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Unit</label>
                                <InputText id="unit" name="unit"   {...input}/>
                            </div>)}/>
                        <Field name="weightage" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Weightage</label>
                                <InputNumber id="weightage"
                                             {...input}
                                             minFractionDigits={1} maxFractionDigits={2}
                                             suffix="%"
                                             onChange={e => {
                                                 input.onChange(e.value)
                                             }}
                                />
                            </div>)}/>
                        <Field name="uweightage" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Unit Weightage</label>
                                <InputNumber id="uweightage"
                                             {...input}
                                             minFractionDigits={1} maxFractionDigits={2}
                                             suffix="%"
                                             onChange={e => {
                                                 input.onChange(e.value)
                                             }}
                                />

                            </div>)}/>
                        <Field name="type" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Type</label>
                                <Dropdown id="state" name="type" options={schTypes} optionLabel="name"
                                          placeholder="Select One"  {...input}
                                          onChange={e => {
                                              input.onChange(e.value)
                                          }}/>

                            </div>)}/>

                        <Field name="sorCost" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">SOR Cost</label>
                                <InputNumber id={"sorCost"}
                                             {...input}
                                             onChange={e => {
                                                 input.onChange(e.value)
                                             }}
                                             mode="currency" currency="INR" locale="en-IN"/>

                            </div>)}/>
                        <Field name="sorQuantity" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">SOR Quantity</label>
                                <InputNumber id={"sorQuantity"}
                                             {...input}
                                             onChange={e => {
                                                 input.onChange(e.value)
                                             }}
                                             locale="en-IN"/>
                            </div>)}/>
                        <Field name="startDate" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Start Date</label>
                                <Calendar id="startDate" name="startDate" {...input}
                                          dateFormat="yy-mm-dd"
                                          onChange={e => {
                                              input.onChange(e.value)
                                          }}/>

                            </div>)}/>
                        <Field name="finishDate" render={({input, meta}) => (
                            <div className="field col-12 md:col-3">
                                <label htmlFor="">Finish Date</label>
                                <Calendar id="finishDate" name="finishDate" {...input}
                                          dateFormat="yy-mm-dd"
                                          onChange={e => {
                                              input.onChange(e.value)
                                          }}/>
                            </div>)}/>

                    </div>
                    <div style={{width: '20%', justifyContent: "center", margin: "0 auto 0 auto"}}>

                        <Button type="submit" label="Save" className="mt-2"/>

                    </div>

                </form>
            )}/>

        </div>
    );
}

export default NewActivityForm;
