import React, {useEffect, useRef, useState} from 'react';
import {ScrollPanel} from "primereact/scrollpanel";
import {useDispatch, useSelector} from "react-redux";
import civilActions from "../../../actions/civilActions";
import {Tree} from "primereact/tree";
import {Splitter, SplitterPanel} from "primereact/splitter";
import {ContextMenu} from "primereact/contextmenu";
import NewCivil from "./newCivil";
import {Button} from "primereact/button";
import AddNode from "./addNode";
import {ProgressSpinner} from "primereact/progressspinner";
import {Toast} from "primereact/toast";
import {SelectButton} from "primereact/selectbutton";


const CivilPage = () => {
    const dispatch = useDispatch();
    const {civilTree, fields, error, loading, subTree,updateNodeValues,message} = useSelector(state => state.civil)
    const mounted = useRef(false);
    const [loadingn, setLoadingn] = useState(true);
    const toast = useRef(null);
    const [showToast, setShowToast] = useState(true)
    const cm = useRef(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState('')
    const [showEntries, setShowEntries] = useState(false)
    const [values, setValues] = useState({})
    const [selNode, setSelNode] = useState({})
    const op = useRef(null);
    const [showAdd,setShowAdd] = useState({nodeId: '', show: false})

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            dispatch(civilActions.getTopLevel(',1,'));
            dispatch(civilActions.getFields())
            // dispatch(deviceActions.fetchAllDeviceTypes())
            mounted.current = true;

        } else {
            //selNode.children=subTree
            if(showToast && updateNodeValues) {
                toast.current.show({severity: 'success', summary: message, life: 3000});
                setShowToast(false)
            }else if(error && showToast) {
                toast.current.show({severity: 'error', summary: JSON.stringify(error), life: 3000});
            }
            setLoadingn(false)
        }


    }, [dispatch, civilTree, subTree, loading, fields, error,updateNodeValues,message])

    const loadOnExpand = (event,options) => {
        console.log("SS",event)
        if (!event.node.children) {
            console.log("SS1")
            setLoadingn(true);
            let node = {...event.node};
            Promise.resolve(civilActions.getSubTree("," + node.path + "," + node.id + ","))
                .then(res => {
                    if(res) {
                        console.log("SS--", JSON.stringify(res))
                        event.node.children = res
                    }
                    setLoadingn(false);
                    setShowAdd({nodeId: node.id, show: true})
                });
        }
    }
    const menu = [
        {
            label: 'Add',
            icon: 'pi pi-plus',
            command: () => {
                toast.current.show({severity: 'success', summary: 'Node Key', detail: selectedNodeKey});
            }
        }
    ]
    const loadContextMenu = (event) => {
        console.log(event.node)
        if (event.node.children) {
            cm.current.show(event.originalEvent)
        }
        //cm.current.show(event.originalEvent)
    }
    const onSelect = (event) => {
        if (event.node.path !== '1') {
            let vals = {}
            fields.forEach(f => {
                console.log(JSON.stringify(event.node))
                const g = event.node[f.group]
                if (g) {
                    f.fields.forEach(ff => {
                        const va = g[ff.name] ? g[ff.name] : (ff.type === 'InputNumber') ? 0 : ''
                        vals[f.group + '-' + ff.name] = va
                    })
                } else if (f.group === 'Main') {
                    f.fields.forEach(ff => {
                        const va = event.node[ff.name] ? event.node[ff.name] : (ff.type === 'InputNumber') ? 0 : ''
                        vals[f.group + '-' + ff.name] = va
                    })
                }
            })

            setValues(vals)
            setShowEntries(true)
            setSelectedNodeId(event.node.id)
        } else {
            setShowEntries(false)
        }


    }
    const nodeTemplate = (node, options) => {
        return (

            <div style={{width : '100%',justifyContent: "center"}}>
                <span style={{width: '90%', float : "left", justifyContent: "center"}}>
                    {node.label}
                </span>
                <div style={{width: '10%' ,float : "right",justifyContent: "center"}}>
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-danger p-button-text"
                            aria-label="Add"
                            tooltip="Click to add children"
                            onClick={(e) => {setSelNode(node);op.current.toggle(e)}}/>
                </div>
            </div>

        )
    }
    const setNodeValues = (data) => {
        dispatch(civilActions.setNodeValues(data))
    }
    //const optionsB = ['Both', 'Tender', 'Non-Tender'];
    const optionsB= [
        {label: 'Both', value: 'Both'},
        {label: 'Tender', value: 'TENDER'},
        {label: 'Non-Tender', value: 'NON-TENDER'}
    ]
    const [value1, setValue1] = useState(true);
    const filterTemplate = (options) => {
        let {filterOptions} = options;

        return (
            <div className="flex gap-2">
                   <SelectButton value={value1} options={optionsB} optionLabel="label" onChange={(e) => myFilterFunction(e,filterOptions)} />


            </div>
        )
    }
    const myFilterFunction = (event, options) => {
        console.log("TT",event.target)
        if(event.target.value==='Both'){
            console.log("Both")
            setValue1(event.target.value)
            options.reset();
        } else {
            setValue1(event.target.value)
            options.filter(event);
        }

       /* if(event.target.value==='Both'){
            console.log("Both")
            options.reset();
        } else if(event.target.value==='Tender') {
            console.log("TT")
            setValue1({'Tender': true})
            options.filter(event);
        } else if(event.target.value==='Non-Tender') {
            console.log("NTT")
            setValue1({'Non-Tender': false})
            options.filter(event.target.value);
        }*/

    }
    return (
        <div className="card">
                <Toast ref={toast} />
                <ContextMenu model={menu} ref={cm} onHide={() => setSelectedNodeKey(null)}/>
                <AddNode op={op} nodeName={selNode}/>
            {loading ?
                <div className="p-d-flex p-jc-center">
                    <ProgressSpinner style={{width: '150px', height: '150px', margin : '0 auto'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
                </div> :
                <React.Fragment>

                         <Splitter style={{width: '100%'}}>
                        <SplitterPanel size={40} minSize={10}>
                            <ScrollPanel  style={{width: '100%', height: '80vh'}}>

                                <Tree id="tr"  style={{border:'none'}} value={civilTree} selectionMode="single" loading={loadingn} onExpand={loadOnExpand}
                                      nodeTemplate={nodeTemplate}
                                      filter
                                      filterBy="type"
                                      filterTemplate={filterTemplate}
                                      contextMenuSelectionKey={selectedNodeKey}
                                      onContextMenuSelectionChange={event => setSelectedNodeKey(event.value)}
                                      onSelect={onSelect}

                                />
                            </ScrollPanel>
                        </SplitterPanel>
                        <SplitterPanel size={60} minSize={20}>
                            <ScrollPanel style={{width: '100%', height: '600px',padding: '0.5em'}}>
                                {showEntries ? <NewCivil fields={fields} nodeId={selectedNodeId} initialValues={values} formSubmit={setNodeValues}/> : <span/>}

                            </ScrollPanel>
                        </SplitterPanel>
                    </Splitter>
                </React.Fragment>
                }

        </div>
    );
};

export default CivilPage;
