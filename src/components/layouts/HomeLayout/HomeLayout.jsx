import React from 'react';
import {Header} from "../../Header/index.js";
import {Footer} from "../../Footer/index.js";
import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default HomeLayout;