import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RENT_SCENE_ROUTE, SUBSCRIBE_PRO_ROUTE} from "../../utils/consts/paths.js";
import {ArendaHomePage} from "../../pages";

const Arenda = () => {
    return (
        <Routes>
            <Route index Component={ArendaHomePage}/>
        </Routes>
    );
};

export default Arenda;