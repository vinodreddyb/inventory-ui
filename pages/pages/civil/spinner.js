import React from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';

const ProgressSpinnerC = () => {
    return (
        <div>
            <div className="card">
                <div className="p-d-flex p-jc-center">
                    <ProgressSpinner style={{width: '150px', height: '150px', margin : '0 auto'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
                </div>
            </div>
        </div>
    );
}
export  default  ProgressSpinnerC
