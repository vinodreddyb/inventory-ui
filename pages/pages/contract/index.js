import React, {useEffect, useRef, useState} from 'react';
import {Timeline} from "primereact/timeline";

import {Card} from "primereact/card";
import {Badge} from "primereact/badge";
import {Chart} from "primereact/chart";
import {DataTable} from "primereact/datatable";
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import {useDispatch, useSelector, useStore} from "react-redux";
import civilActions, {getContractSchedule} from "../../../actions/civilActions";
import {ProgressSpinner} from "primereact/progressspinner";
import css from 'styled-jsx/css';
const ContractProgress = () => {
    const dispatch = useDispatch();
    const mounted = useRef(false);
    const {progressData,loading} = useSelector(state => state.civil)
    useEffect(() => {
        if (!mounted.current) {
            dispatch(civilActions.getContractSchedule())
            mounted.current = true;
        }
    },[dispatch, progressData,loading])
    const {className, styles} = css.resolve`
        .p-datatable > :global(.p-datatable-thead) {
            background-color: #54b5a6;
            color: #ffffff;
        }
    `;


    const cols = progressData.cols
    const ycols = progressData.years
    const scols = progressData.scolumns
    const ycolSize = progressData.ycolSize
    const headerGroup = (
        <ColumnGroup>
            <Row>
                {cols? cols.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} rowSpan={3} style={{minWidth:"120px"}}/>
                )): <div></div>}
                <Column header="Schedule" colSpan={scols? scols.length:0} />
            </Row>
            <Row>


                {ycols? ycols.map((col, i) => (
                    <Column  header={col} colSpan={ycolSize[col]} style={{minWidth:"120px"}}/>
                )): <div></div>}
            </Row>

            <Row>

                {scols? scols.map((col, i) => (
                    <Column  key={col.field} field={col.field} header={col.header}  style={{minWidth:"120px"}}/>
                )): <div></div>}
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



    console.log("SD", JSON.stringify(progressData))
    return (

        <div className="grid">

            <div className="col-12">
                {loading ?
                    <div className="p-d-flex p-jc-center">
                        <ProgressSpinner style={{width: '150px', height: '150px', margin: '0 auto'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
                    </div> :
                 <div className="card">
                     <style>{styles}</style>
                    <DataTable value={progressData.data}
                               className={className}
                               headerColumnGroup={headerGroup}
                               size = "small"
                               stripedRows
                               resizableColumns
                               columnResizeMode="expand"
                               showGridlines
                               rowGroupMode="rowspan" groupRowsBy="Activity"
                               tableStyle={{ minWidth: '50rem' }}
                               rowGroupHeaderTemplate={headerTemplate}
                               sortMode="single" sortField="Name"
                               sortOrder={1}

                                >
                        {cols? cols.map((col, i) => (
                            <Column key={col.field} field={col.field} header={col.header}  frozen={col.frozen} style={{minWidth:"120px"}}/>
                        )): <div></div>}
                        {scols? scols.map((col, i) => (
                            <Column key={col.field} field={col.field} header={col.header}  frozen={col.frozen} style={{minWidth:"120px"}}/>
                        )): <div></div>}
                    </DataTable>
                </div>}
            </div>
        </div>
    );
};

export default ContractProgress;
