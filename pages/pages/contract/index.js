import React, {useEffect, useRef, useState} from 'react';
import {Timeline} from "primereact/timeline";

import {Card} from "primereact/card";
import {Badge} from "primereact/badge";
import {Chart} from "primereact/chart";
import {DataTable} from "primereact/datatable";
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {useDispatch, useSelector, useStore} from "react-redux";
import civilActions, {getContractSchedule} from "../../../actions/civilActions";
import {ProgressSpinner} from "primereact/progressspinner";
import {Dialog} from "primereact/dialog";
import NewCivil from "../civil/newCivil";
import NewActivityWindow from "./newActivityWindow";
import NewActivityForm from "./newActivityWindow";
import {Button} from "primereact/button";

const ContractProgress = () => {
    const dispatch = useDispatch();
    const mounted = useRef(false);
    const {progressData, loading} = useSelector(state => state.civil)
    const [showEntries, setShowEntries] = useState(false)
    useEffect(() => {
        if (!mounted.current) {
            dispatch(civilActions.getContractSchedule())
            mounted.current = true;
        }
    }, [dispatch, progressData, loading])

    const cols = progressData.cols

    const ycols = progressData.years
    const scols = progressData.scolumns
    const ycolSize = progressData.ycolSize
    const headerGroup = (
        <ColumnGroup>
            <Row>

                {cols ? cols.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} rowSpan={3} style={{minWidth: "120px"}}/>
                )) : <div></div>}
                <Column header="Schedule" colSpan={scols ? scols.length : 0}/>
            </Row>
            <Row>


                {ycols ? ycols.map((col, i) => (
                    <Column header={col} colSpan={ycolSize[col]} style={{minWidth: "120px"}}/>
                )) : <div></div>}
            </Row>

            <Row>

                {scols ? scols.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} style={{minWidth: "120px"}}/>
                )) : <div></div>}
            </Row>
        </ColumnGroup>
    );
    const headerTemplate = (data) => {
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">{data.Name}</span>
            </div>
        );
    };
    const actionBodyTemplate = (rowData) => {

        return (
            <>
                <Button icon="pi pi-file-edit" className="p-button-rounded  p-button-text"/>
                <Button icon="pi pi-calendar-plus" tooltip={rowData.Type + " Schedule"} className="p-button-rounded p-button-success p-button-text"/>
            </>
        );
    };
    const saveActivity = (data) => {
        console.log("EDIT", JSON.stringify(data))
        setShowEntries(false)

    }

    return (
        <div className="card">
            <div className="grid">
                <Dialog header={"New Activity form"} visible={showEntries} maximizable breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} onHide={() => setShowEntries(false)}>
                    <NewActivityForm formSubmit={saveActivity}/>
                </Dialog>
                <div className="col-12">

                    <div style={{width: '20%', float: "left", justifyContent: "center"}}>
                        <Button icon="pi pi-plus" severity="secondary" className="p-button-rounded p-button-outlined p-button-raised"
                                aria-label="Add"
                                tooltip="New Activity"
                                onClick={(e) => {
                                    /*setSelNode(node);
                                    op.current.toggle(e);*/
                                    setShowEntries(true)
                                    e.stopPropagation();
                                }}></Button>

                    </div>


                </div>
                <div className="col-12">

                    {loading ?
                        <div className="p-d-flex p-jc-center">
                            <ProgressSpinner style={{width: '150px', height: '150px', margin: '0 auto'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
                        </div> :

                        <DataTable value={progressData.data}
                                   headerColumnGroup={headerGroup}
                                   size="small"
                                   stripedRows
                                   resizableColumns
                                   columnResizeMode="expand"
                                   showGridlines
                                   rowGroupMode="rowspan" groupRowsBy="Activity"
                                   tableStyle={{minWidth: '50rem'}}
                                   rowGroupHeaderTemplate={headerTemplate}
                                   sortMode="single" sortField="Name"
                                   sortOrder={1}

                        >

                            {cols ? cols.map((col, i) => {
                                if (!col.template) {
                                    return <Column key={col.field} field={col.field} header={col.header} frozen={col.frozen} style={{minWidth: "120px"}}/>

                                } else {
                                    return <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
                                }
                            }) : <div></div>}
                            {scols ? scols.map((col, i) => (
                                <Column key={col.field} field={col.field} header={col.header} frozen={col.frozen} style={{minWidth: "120px"}}/>
                            )) : <div></div>}

                        </DataTable>
                    }
                </div>
            </div>
        </div>
    );
};

export default ContractProgress;
