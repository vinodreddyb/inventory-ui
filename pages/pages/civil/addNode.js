import React, { useState, useEffect, useRef } from 'react';
import {OverlayPanel} from "primereact/overlaypanel";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
const AddNode = ({op,nodeName}) => {
    const [newNodeName, setNewNodeName] = useState('');
    const addNode = () => {
        console.log(nodeName)
        /*if(nodeName.children) {
            const len = nodeName.children.length
            nodeName.children.append({
                key: nodeName.id + '-' + (len+1),
                label: newNodeName,
                leaf: false,
                path: nodeName.path + "," + nodeName.id ,
                id: nodeName.id + '-' + (len+1)
            })
        } else {
            nodeName.children = [{
                key: nodeName.id + '-' + 1,
                label: newNodeName,
                leaf: false,
                path: nodeName.path + "," + nodeName.id ,
                id: nodeName.id + '-' + 1
            }]
        }*/

    }
    return(

            <OverlayPanel ref={op} showCloseIcon id="overlay_panel"
                          breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '300px'}}
                          onHide={()=> setNewNodeName('')} >
                <div className="formgrid grid">
                    <div className="field col">
                        <InputTextarea value={newNodeName} onChange={(e) => setNewNodeName(e.target.value)} rows={5} cols={30} autoResize />
                    </div>
                    <div className="field col">
                        <Button className="p-button-rounded" onClick={addNode}>Add</Button>
                    </div>
                </div>
            </OverlayPanel>

    )
}

export default AddNode;
