import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import ProLayout from "./components/Layout/ProLayout.jsx";
import {
    HOUSING_CREATE_ROUTE,
    MY_HOUSING_ROUTE,
    MY_PUBLISH_HOUSING_ROUTE,
    PRO_SCENE_ROUTE,
    PROFILE_ROUTE
} from "../../utils/consts/paths.js";
import {
    MyHousingsPage,
    NotFoundPage,
    MyPublishHousingsPage,
    HousingCreatePage,
    HousingViewPage, PublishHousingViewPage
} from "../../pages/index.js";

const ProScene = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProLayout/>}>
                <Route index element={<MyHousingsPage />} />
                <Route path={MY_HOUSING_ROUTE} element={<Navigate to={'/'+PRO_SCENE_ROUTE} replace/>} />
                <Route path={HOUSING_CREATE_ROUTE} element={<HousingCreatePage/> } />
                <Route path={MY_HOUSING_ROUTE + '/:id'} element={<HousingViewPage/> } />

                <Route path={MY_PUBLISH_HOUSING_ROUTE} element={<MyPublishHousingsPage/> } />
                <Route path={MY_PUBLISH_HOUSING_ROUTE + '/:id'} element={<PublishHousingViewPage/> } />

                <Route path={"*"} element={<NotFoundPage/>} />
            </Route>
        </Routes>
    );
};

export default ProScene;