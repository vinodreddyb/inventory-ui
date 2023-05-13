import getConfig from 'next/config';
import Link from 'next/link';
import {classNames} from 'primereact/utils';
import React, {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {LayoutContext} from './context/layoutcontext';
import signIn, {signOutA} from "../firebase/signin";
import {useRouter} from 'next/router';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const router = useRouter()

    const handleSignout = async (event) => {
        console.log("logo")
        event.preventDefault()

        const { result, error } = await signOutA();

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/auth/login")
    }

    return (
        <div className="layout-topbar">
            <Link href="/">
                <a className="layout-topbar-logo">
                    <>
                        <img src={`${contextPath}/layout/images/tabit1.png`} width="60px" height={'60px'} widt={'true'} alt="logo" />
                        <span>IFTAS | EIL</span>
                    </>
                </a>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>
            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={handleSignout}>
                    <i className="pi pi-user-minus"></i>
                    <span>Profile</span>
                </button>

            </div>

        </div>
    );
});

export default AppTopbar;
