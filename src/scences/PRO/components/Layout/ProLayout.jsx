import React from 'react';
import {Outlet} from "react-router-dom";
import {Header, SideMenu} from "../index.js";
import './css/layout.css'

const ProLayout = () => {
    return (
        <div className={'default__layout'}>
            <Header />
            <SideMenu/>
            <div className={'static__container'}>
                <main className={'content'}>
                    <Outlet/>
                </main>
                <footer>Footer</footer>
            </div>

        </div>
    );
};

export default ProLayout;