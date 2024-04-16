import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {
    Home,
    LoginPage,
    NoPermissionsPage,
    NotFoundPage,
    ProfilePage,
    PublishHousingPage,
    SignUp, SubscribeProPage
} from "../../pages/index.js";
import {HomeLayout, AuthLayout} from "../../components";
import {
    CHAT_SCENE_ROUTE,
    LOGIN_ROUTE,
    NO_PERMISSIONS_ROUTE, PRO_SCENE_ROUTE,
    PROFILE_ROUTE,
    PUBLISH_HOUSING_ROUTE, REGISTRATION_ROUTE,
    RENT_SCENE_ROUTE, SUBSCRIBE_PRO_ROUTE
} from "../../utils/consts/paths.js";
import {Arenda, ChatScene, ProScene} from "../../scences/index.js";
import {RequireAuth} from "../index.js";
import {ADMIN_ROLE, LANDLORD_ROLE, USER_ROLE} from "../../utils/consts/roles.js";


export const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomeLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='/home' element={<Navigate to={'/'} replace/>}/>
                <Route path={PUBLISH_HOUSING_ROUTE + '/:id'} element={<PublishHousingPage/>}/>
                <Route path={PROFILE_ROUTE} element={
                    <RequireAuth>
                        <ProfilePage/>
                    </RequireAuth>
                }/>
                <Route path='/' Component={AuthLayout}>
                    <Route path={LOGIN_ROUTE} Component={LoginPage}/>
                    <Route path={REGISTRATION_ROUTE} Component={SignUp}/>
                </Route>
                <Route path={NO_PERMISSIONS_ROUTE} element={<NoPermissionsPage/>}/>
                <Route path="*" Component={NotFoundPage}/>
            </Route>
            <Route path={'/' + RENT_SCENE_ROUTE + '/*'} Component={Arenda}/>
            <Route path={SUBSCRIBE_PRO_ROUTE} element={
                <RequireAuth requireRoles={[USER_ROLE]} unrequireRoles={[LANDLORD_ROLE]}>
                    <SubscribeProPage/>
                </RequireAuth>}
            />
            <Route path={'/' + PRO_SCENE_ROUTE + '/*'} element={
                <RequireAuth requireRoles={[LANDLORD_ROLE]}>
                    <ProScene/>
                </RequireAuth>
            }/>
            <Route path={'/' + CHAT_SCENE_ROUTE+'/*'} element={
                <RequireAuth requireRoles={[LANDLORD_ROLE]}>
                    <ChatScene />
                </RequireAuth>
            }/>
        </Routes>
    );
};