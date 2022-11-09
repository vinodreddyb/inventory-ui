import {Field, Form} from 'react-final-form';
import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {TabPanel, TabView} from "primereact/tabview";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import {Calendar} from "primereact/calendar";

const NewCivilForm = ({initialValues, formsubmit, actionType, fields}) => {
    const [formFields, setFormFields] = useState({})
    const [mainFields, setMainFields] = useState([])
    const [tabFields, setTabFields] = useState([])


    const onSubmit = (data, form) => {
        const formatter = new Intl.DateTimeFormat("en-GB", { // <- re-use me
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        let data1 = formatter.format(data['Main-startDate']);
        console.log(data1)
       // console.log( dateToYMD(data['Main-startDate']))
        var date = new Date("11-18-2022");
        console.log(date);
        form.restart();
    };
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
        setFormFields(iv)
        setTabFields(fields.filter(item=> item.group !=='Main'))
        setMainFields(fields.filter(item=> item.group ==='Main'))
    },[])



    function getFields(item) {
        return <div className="formgrid grid" key={item.group}>
            {item.fields.map((field, j) => {
                return (
                    <Field name={`${item.group}-${field.name}`} key={`${item.group}-${field.name}`} render={({input, meta}) => (
                        <div className="field col" key={`${item.group}-${field.name}`}>

                                                                <label  htmlFor={`${item.group}-${field.name}`}>{field.label}</label>
                                                                {(() => {
                                                                    switch (field.type) {

                                                                        case "InputText":
                                                                            return <InputText id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}   {...input}/>

                                                                        case "InputNumber":
                                                                            return (field.attributes.mode === 'currency' ?
                                                                                <InputNumber id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`}
                                                                                             {...input}
                                                                                             onChange={e => {
                                                                                                 input.onChange(e.value)
                                                                                             }}

                                                                                             mode="currency" currency={field.attributes.currency} locale={field.attributes.locale}/>
                                                                                : <InputNumber id={`${item.group}-${field.name}`}
                                                                                               {...input}
                                                                                               onChange={e => {
                                                                                                   input.onChange(e.value)
                                                                                               }}
                                                                                />);

                                                                        case "Calendar":
                                                                            return (<Calendar id={`${item.group}-${field.name}`} name={`${item.group}-${field.name}`} {...input}
                                                                                              dateFormat="dd/mm/yy"


                                                                                              onChange={e => {
                                                                                                  input.onChange(e.value)
                                                                                              }} />)
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
