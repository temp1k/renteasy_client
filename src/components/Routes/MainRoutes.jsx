import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home, NotFoundPage, ProfilePage, PublishHousingPage} from "../../pages/index.js";
import {Layout} from "../Layout/index.js";
import {PROFILE_ROUTE, PUBLISH_HOUSING_ROUTE, RENT_SCENE_ROUTE} from "../../utils/paths.js";
import {Arenda} from "../../scences/index.js";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={PUBLISH_HOUSING_ROUTE + '/:id'} element={ <PublishHousingPage /> } />
                <Route path={PROFILE_ROUTE} element={<ProfilePage/>}/>
            </Route>
            <Route path={RENT_SCENE_ROUTE} Component={Arenda}/>
            <Route path="*" Component={NotFoundPage}/>
        </Routes>
    );
};