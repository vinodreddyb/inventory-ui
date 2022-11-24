import React, {useEffect, useRef, useState} from 'react';
import {ScrollPanel} from "primereact/scrollpanel";
import {useDispatch, useSelector} from "react-redux";
import civilActions, {addChildNode} from "../../../actions/civilActions";
import {Tree} from "primereact/tree";
import {Splitter, SplitterPanel} from "primereact/splitter";
import {ContextMenu} from "primereact/contextmenu";
import NewCivil from "./newCivil";
import {Button} from "primereact/button";
import AddNode from "./addNode";
import {ProgressSpinner} from "primereact/progressspinner";
import {Toast} from "primereact/toast";
import {SelectButton} from "primereact/selectbutton";
import {TabPanel, TabView} from "primereact/tabview";
import StatusForm from "./status";
import {Badge} from "primereact/badge";
import {Dialog} from "primereact/dialog";
import StatusChart from "./statusChart";


const CivilPage = () => {
    const dispatch = useDispatch();
    const {tenderTree, nonTenderTree, fields, error, loading, subTree, updateNodeValues, message} = useSelector(state => state.civil)
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
    const [showAddStatus, setShowAddStatus] = useState(false)
    const [showStatus, setShowStatus] = useState(false)
    const [statusData, setStatusData] = useState({})
    const [expandedKeys, setExpandedKeys] = useState({});
    const [expandedKeys1, setExpandedKeys1] = useState({});
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            dispatch(civilActions.getTopLevel(',1,'));
            dispatch(civilActions.getFields())
            // dispatch(deviceActions.fetchAllDeviceTypes())
            mounted.current = true;

        } else {
            //selNode.children=subTree
            if (showToast && message) {
                toast.current.show({severity: 'success', summary: message, life: 3000});
               /* setShowToast(false)
                setShowEntries(false)
                setShowAddStatus(false)*/
            } else if (error && showToast) {
                toast.current.show({severity: 'error', summary: JSON.stringify(error), life: 3000});
            }
            setLoadingn(false)
        }


    }, [dispatch, tenderTree, nonTenderTree, subTree, loading, fields, updateNodeValues])

    const loadOnExpand = (event, options) => {

        setLoadingn(true);
        let node = {...event.node};
        Promise.resolve(civilActions.getSubTree("," + node.path + "," + node.id + ","))
            .then(res => {
                if (res) {
                    console.log("SS--", JSON.stringify(res))
                    event.node.children = res
                }
                setLoadingn(false);
                //setShowAdd({nodeId: node.id, show: true})
            });


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
    const setNodeValues = (data,addChild) => {
        console.log("EDIT", addChild)
        if(addChild) {
            console.log("Path ", "," + selNode.path + "," + selNode.id + ",")
            civilActions.addChildNode(data, "," + selNode.path + "," + selNode.id + ",").then(res=> {
                selNode.children = res
                setSelNode(res)
                toast.current.show({severity: 'success', summary: "Node added successfully", life: 3000});
                setShowEntries(false)
            })
           // dispatch(civilActions.addChildNode(data))
        } else {
            dispatch(civilActions.setNodeValues(data))
        }
    }
    const onSelect = (event) => {


    }
    const showView = (e) => {
        Promise.resolve(civilActions.getStatusGraph(e.id))
            .then(res => {
                setStatusData(res)
                setShowStatus(true)
                setSelNode(e)
            })

    }


    const showAddValues = (node) => {
        if (!node.children) {
            let vals = {}
            fields.forEach(f => {
                console.log(JSON.stringify(node))
                const g = node[f.group]
                if (g) {
                    f.fields.forEach(ff => {
                        const va = g[ff.name] ? g[ff.name] : (ff.type === 'InputNumber') ? 0 : ''
                        vals[f.group + '-' + ff.name] = va
                    })
                } else if (f.group === 'Main') {
                    f.fields.forEach(ff => {
                        const va = node[ff.name] ? node[ff.name] : (ff.type === 'InputNumber') ? 0 : ''
                        vals[f.group + '-' + ff.name] = va
                    })
                }
            })

            setValues(vals)
            setShowEntries(true)
            setSelectedNodeId(node.id)
        } else {
            setShowEntries(false)
        }
    }

    const addChildren = (node) => {
        console.log("Sel node", node)
        setSelNode(node)
        setValues({"newChild": true })
        setShowEntries(true)
        setSelectedNodeId(node.id)
    }

    function showStatusDialog(node) {

        setSelNode(node)
        setShowAddStatus(true);
    }

    const nodeTemplate = (node, options) => {
        return (

            <div style={{width: '100%', justifyContent: "center"}}>
                <span style={{width: '80%', float: "left", justifyContent: "center"}}>
                    {node.label}
                </span>

                <div style={{width: '20%', float: "right", justifyContent: "center"}}>
                    <Button icon="pi pi-plus-circle" className="p-button-rounded p-button-danger p-button-text"
                            aria-label="Add"
                            tooltip="Click to add children"
                            onClick={(e) => {
                                /*setSelNode(node);
                                op.current.toggle(e);*/
                                addChildren(node)
                                e.stopPropagation();
                            }}/>
                    {node.path !== "1" ?
                        <React.Fragment>
                            <Button icon="pi pi-file-edit" className="p-button-rounded p-button-danger p-button-text"
                                    aria-label="Add"
                                    tooltip="Edit values"
                                    onClick={(e) => {
                                        /*setSelNode(node);
                                        op.current.toggle(e);*/
                                        showAddValues(node)

                                        e.stopPropagation();
                                    }}/>
                            <Button icon="pi pi-chart-bar" className="p-button-rounded p-button-danger p-button-text"
                                    aria-label="Add"
                                    tooltip="View Status"
                                    onClick={(e) => {
                                        showView(node);
                                        e.stopPropagation();
                                    }}>

                            </Button>
                            <Button icon="pi pi-calendar-plus" className="p-button-rounded p-button-danger p-button-text"
                                    aria-label="Add"
                                    tooltip="Add Status"
                                    onClick={(e) => {
                                        showStatusDialog(node);
                                        e.stopPropagation();
                                    }}/>
                        </React.Fragment> : <span/>}

                </div>


            </div>

        )
    }

    //const optionsB = ['Both', 'Tender', 'Non-Tender'];
    const optionsB = [
        {label: 'Both', value: 'Both'},
        {label: 'Tender', value: 'TENDER'},
        {label: 'Non-Tender', value: 'NON-TENDER'}
    ]
    const [value1, setValue1] = useState(true);
    const filterTemplate = (options) => {
        let {filterOptions} = options;

        return (
            <div className="flex gap-2">
                <SelectButton value={value1} options={optionsB} optionLabel="label" onChange={(e) => myFilterFunction(e, filterOptions)}/>


            </div>
        )
    }
    const myFilterFunction = (event, options) => {
        console.log("TT", event.target)
        if (event.target.value === 'Both') {
            console.log("Both")
            setValue1(event.target.value)
            options.reset();
        } else {
            setValue1(event.target.value)
            options.filter(event);
        }
    }

    const saveStatus = (data) => {
        dispatch(civilActions.saveProgress(data))
        setShowAddStatus(false)
    }

    return (
        <div className="card">
            <Toast ref={toast}/>
            <ContextMenu model={menu} ref={cm} onHide={() => setSelectedNodeKey(null)}/>
            <Dialog header="Work Status" visible={showStatus} maximizable breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} onHide={() => setShowStatus(false)}>
                <StatusChart data={statusData} node={selNode}/>
            </Dialog>
            <Dialog header={values['newChild']? "Add new child" : "Edit values"} visible={showEntries} maximizable breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} onHide={() => setShowEntries(false)}>
                <NewCivil fields={fields} nodeId={selectedNodeId} initialValues={values} formSubmit={setNodeValues}/>
            </Dialog>

            <AddNode op={op} nodeName={selNode}/>
            {loading ?
                <div className="p-d-flex p-jc-center">
                    <ProgressSpinner style={{width: '150px', height: '150px', margin: '0 auto'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
                </div> :
                <React.Fragment>

                    <TabView>
                        <TabPanel header="Tender">
                            <ScrollPanel style={{width: '100%', height: '80vh'}}>
                                <Tree id="tr" expandedKeys={expandedKeys}  style={{border: 'none'}} value={tenderTree} selectionMode="single" loading={loadingn} onExpand={loadOnExpand}
                                      nodeTemplate={nodeTemplate}
                                      onToggle={e => setExpandedKeys(e.value)}
                                      onSelect={onSelect}

                                />

                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Non-Tender">
                            <ScrollPanel style={{width: '100%', height: '80vh'}}>

                                <Tree id="tr" style={{border: 'none'}} value={nonTenderTree} selectionMode="single" loading={loadingn}
                                      onExpand={loadOnExpand}
                                      expandedKeys={expandedKeys1}
                                      onToggle={e => setExpandedKeys1(e.value)}
                                      nodeTemplate={nodeTemplate}
                                      onSelect={onSelect}

                                />
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </React.Fragment>
            }
            <Dialog header="Add Status" modal visible={showAddStatus} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} onHide={() => setShowAddStatus(false)}>
                <StatusForm nodeData={selNode} formSubmit={saveStatus}/>
            </Dialog>
        </div>
    );
};

export default CivilPage;
