import getConfig from 'next/config';
import React, {useContext} from 'react';
import {LayoutContext} from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    //logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`
    return (
        <div className="layout-footer">
            <img src={`${contextPath}/layout/images/tabit.png`} alt="Logo" height="60" className="mr-2" />
            By
            <span className="font-medium ml-2">TABIT Solutions</span>
        </div>
    );
};

export default AppFooter;
