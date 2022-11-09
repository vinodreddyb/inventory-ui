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


const CivilPage = () => {
    const dispatch = useDispatch();
    const {civilTree, fields, error, loading, subTree} = useSelector(state => state.civil)
    const mounted = useRef(false);
    const [loadingn, setLoadingn] = useState(true);
    const toast = useRef(null);
    const cm = useRef(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
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
            setLoadingn(false)
        }


    }, [dispatch, civilTree, subTree, loading, fields, error])

    const loadOnExpand = (event) => {
        if (!event.node.children) {
            setLoadingn(true);
            let node = {...event.node};
            Promise.resolve(civilActions.getSubTree("," + node.path + "," + node.id + ","))
                .then(res => {
                    if(res) {
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
    return (
        <div className="card">


                <ContextMenu model={menu} ref={cm} onHide={() => setSelectedNodeKey(null)}/>
                <AddNode op={op} nodeName={selNode}/>
                <Splitter style={{width: '100%'}}>
                    <SplitterPanel size={40} minSize={10}>
                        <ScrollPanel  style={{width: '100%', height: '80vh'}}>

                            <Tree style={{border:'none'}} value={civilTree} selectionMode="single" loading={loadingn} onExpand={loadOnExpand}
                                  nodeTemplate={nodeTemplate}
                                  contextMenuSelectionKey={selectedNodeKey}
                                  onContextMenuSelectionChange={event => setSelectedNodeKey(event.value)}
                                  onSelect={onSelect}
                                />
                        </ScrollPanel>
                    </SplitterPanel>
                    <SplitterPanel size={60} minSize={20}>
                        <ScrollPanel style={{width: '100%', height: '600px',padding: '0.5em'}}>
                            {showEntries ? <NewCivil fields={fields} initialValues={values}/> : <span/>}

                        </ScrollPanel>
                    </SplitterPanel>
                </Splitter>

        </div>
    );
};

export default CivilPage;
