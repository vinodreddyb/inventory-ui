import {Field, Form} from 'react-final-form';
import React,{useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {Calendar} from "primereact/calendar";
import {Toast} from "primereact/toast";
import {InputSwitch} from "primereact/inputswitch";
import {InputTextarea} from "primereact/inputtextarea";

const NewCivilForm = ({initialValues, formSubmit: formSubmit, nodeId, fields}) => {
    const [mainFields, setMainFields] = useState([])
    const [tabFields, setTabFields] = useState([])
    const toast = useRef(null);


    const onSubmit = (data, form) => {
        let res = {}
        for (const property in data) {
            let val = (data[property] instanceof Date && !isNaN(data[property]))? dateToYMD(data[property]) : data[property]
            if(property.startsWith('Main')) {
                res[property.substring(property.indexOf("-") + 1)] = val
            } else {
                const sp = property.toLowerCase().replace("-",".")
                set(res, sp ,val )
            }
        }
        res['id'] = nodeId
        res['type'] = (data['Main-type'])? "TENDER" : "NON-TENDER"
        if(initialValues['newChild']) {
            formSubmit(res,true)
        } else {
            formSubmit(res,false)
        }


        form.restart();
    };
    function set(obj = {}, key, val) {
        const keys = key.split('.')
        const last = keys.pop()
        keys.reduce((o, k) => o[k] ??= {}, obj)[last] = val
    }
    function dateToYMD(date) {
        const d = date.getDate();
        const m = date.getMonth() + 1; //Month from 0 to 11
        const y = date.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    useEffect(() => {
        const iv = {}
        fields.forEach(i=>{
            i.fields.forEach(iff=> {
                if(iff.type ==='InputNumber') {
                    iv[i.group + '-' + iff.name] = 0
                } else {
                    iv[i.group + '-' + iff.name] = ''
                }
            })

        })
        setTabFields(fields.filter(item=> item.group !=='Main'))
        setMainFields(fields.filter(item=> item.group ==='Main'))

    },[])

    function getFields(item) {
        return <div className="formgrid grid" key={item.group}>
            <Toast ref={toast} />
            {item.fields.filter(field => field.name !=='name').map((field) => {
                return (
                    <Field name={`${item.group}-${field.name}`} key={`${item.group}-${field.name}`} render={({input, meta}) => (
                        <div className="field col" key={`${item.group}-${field.name}`}>

                                                                <label  htmlFor={`${item.group}-${field.name}`}>{field.label}</label>
                                                                {(() => {
                                                                    switch (field.type) {

                                                                        case "InputText":
                                                                            return <InputText id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}   {...input}/>

                                                                        case "InputNumber":
                                                                             switch (field.attributes.mode) {
                                                                                 case "currency" :
                                                                                     return ( <InputNumber id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}
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
                                                                                              }} />)
                                                                        case "InputSwitch":
                                                                            return (<React.Fragment><br/><InputSwitch id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}
                                                                                                 checked={initialValues[`${item.group}-${field.name}`] === 'TENDER'}
                                                                                                 onChange={e => {
                                                                                                     input.onChange(e.value)
                                                                                                     if(e.value) {
                                                                                                         console.log(e.value)
                                                                                                         initialValues[`${item.group}-${field.name}`] = "TENDER"
                                                                                                     } else {
                                                                                                         initialValues[`${item.group}-${field.name}`] = "NON-TENDER"
                                                                                                     }
                                                                                                 }}

                                                                                                 /></React.Fragment>)
                                                                        case "InputTextarea":
                                                                            return <InputTextarea  id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`} {...input} autoResize />
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

    return (
        <div className="grid">
            <div className="col-12">
                <Form onSubmit={onSubmit} initialValues={initialValues}  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid" noValidate>
                        <Field name="Main-name" key="Main-name" render={({input, meta}) => (
                        <div className="field col" >
                            <label  htmlFor="">Name</label>
                            <InputTextarea rows={5} id="Main-name" name="Main-name"   {...input}/>
                        </div>)}/>
                        {mainFields.map(item => {
                            return(<div className="card p-fluid" key={item.group} >
                                {getFields(item)}
                            </div>)
                        })}
                            {tabFields.map(item => {
                                return (
                                    <Panel header={item.group.toUpperCase()}  className="p-fluid" style={{marginTop:5}} key={item.group} toggleable>
                                        {getFields(item)}
                                    </Panel>
                                    )
                            })}
                        <Button type="submit" label="Save" className="mt-2"/>
                    </form>
                )} />
            </div>
        </div>
    );
}

export default NewCivilForm;
