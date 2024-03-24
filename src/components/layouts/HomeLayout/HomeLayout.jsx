import React from 'react';
import {Header} from "../../Header/index.js";
import {Footer} from "../../Footer/index.js";
import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <main style={{minHeight: '80vh'}}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default HomeLayout;