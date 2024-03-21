import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Home, LoginPage, NotFoundPage, ProfilePage, PublishHousingPage} from "../../pages/index.js";
import {Layout} from "../Layout/index.js";
import {LOGIN_ROUTE, PROFILE_ROUTE, PUBLISH_HOUSING_ROUTE, RENT_SCENE_ROUTE} from "../../utils/paths.js";
import {Arenda} from "../../scences/index.js";
import {RequireAuth, AuthProvider} from "../../hoc";


export const MainRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/home' element={<Navigate to={'/'} replace/>}/>
                    <Route path={PUBLISH_HOUSING_ROUTE + '/:id'} element={<PublishHousingPage/>}/>
                    <Route path={PROFILE_ROUTE} element={
                        <RequireAuth>
                            <ProfilePage/>
                        </RequireAuth>
                    }/>
                    <Route path={LOGIN_ROUTE} Component={LoginPage}/>
                </Route>
                <Route path={RENT_SCENE_ROUTE} Component={Arenda}/>
                <Route path="*" Component={NotFoundPage}/>
            </Routes>
        </AuthProvider>
    );
};