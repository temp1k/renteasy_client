import React from 'react';
import {FooterArendaHome, HeaderArendaHome,} from "./index.js";
import '../css/layout_arenda.css'

// eslint-disable-next-line react/prop-types
const LaytouArendaHome = ({children}) => {
    return (
        <div>
            <HeaderArendaHome />
            <div className="main">
                {children}
            </div>
            <FooterArendaHome />
        </div>
    );
};

export default LaytouArendaHome;