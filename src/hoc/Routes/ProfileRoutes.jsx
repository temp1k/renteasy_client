import React from 'react';
import {Route, Routes} from "react-router-dom";
import {ProfilePage, ProfileRequestPage} from "../../pages/index.js";
import {MY_REQUESTS_ROUTE} from "../../utils/consts/paths.js";

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route path={'/'}>
                <Route index element={<ProfilePage/>}/>
                <Route path={MY_REQUESTS_ROUTE+'/:id'} element={<ProfileRequestPage/>} />
            </Route>

        </Routes>
    );
};

export default ProfileRoutes;