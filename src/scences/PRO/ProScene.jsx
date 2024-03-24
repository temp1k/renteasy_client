import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProLayout from "./components/Layout/ProLayout.jsx";

const ProScene = () => {
    return (
        <Routes>
            <Route index element={ProLayout}></Route>
        </Routes>
    );
};

export default ProScene;