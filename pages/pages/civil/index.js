import React, {useEffect, useRef, useState} from 'react';

import {Fieldset} from "primereact/fieldset";
import {ScrollPanel} from "primereact/scrollpanel";
import {useDispatch, useSelector} from "react-redux";
import civilActions from "../../../actions/civilActions";
import {Tree} from "primereact/tree";
import {Splitter, SplitterPanel} from "primereact/splitter";

const CivilPage = () => {
    const dispatch = useDispatch();
    const {civilTree,error,loading} = useSelector(state => state.civil)
    const mounted = useRef(false);
    const [topNodes,setTopNodes] = useState([])
    const [loadingn, setLoadingn] = useState(true);
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            dispatch(civilActions.getTopLevel(',1,'));
           // dispatch(deviceActions.fetchAllDeviceTypes())
            mounted.current = true;
        } else {
            setLoadingn(false)
        }

    }, [dispatch, civilTree,loading,error])
    //console.log(JSON.stringify(civilTree))


    const loadOnExpand = (event) => {
        if (!event.node.children) {
            setLoadingn(true);
            let node = { ...event.node };
            //console.log(JSON.stringify(node))
            setTopNodes(civilTree)
            dispatch(civilActions.getTopLevel(',1,' + node.id + ","))

          //  setNodes(value);
            setLoadingn(false);
        }
    }
    return (
        <div className="grid">
            <div className="col-12">
                <Splitter style={{ width: '100%', height: '81%' }} >
                    <SplitterPanel size={30} minSize={10} >
                        <ScrollPanel style={{ width: '100%', height: '100%' }}>
                            <Tree value={civilTree}  loading={loadingn} onExpand={loadOnExpand}/>
                        </ScrollPanel>
                    </SplitterPanel>
                    <SplitterPanel size={70} minSize={20} >
                        <ScrollPanel style={{ width: '100%', height: '100%' }}>
                        </ScrollPanel>
                    </SplitterPanel>
                </Splitter>
            </div>
        </div>
    );
};

export default CivilPage;
