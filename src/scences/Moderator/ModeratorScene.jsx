import React from 'react';
import PropTypes from 'prop-types';
import {Navigate, Route, Routes} from "react-router-dom";
import {
    CancelRequests,
    ConfirmRequests,
    PublishRequests,
    RequestViewPage,
    StatisticsUsers,
    UserProfilePage, UsersList
} from "./pages/index.js";
import {ModeratorLayout, RequestsLayout, UsersLayout} from "./components/layouts/layouts.jsx";
import {
    AWAIT_REQUESTS_ROUTE,
    CANCEL_REQUESTS_ROUTE,
    CONFIRM_REQUESTS_ROUTE, MODERATOR_STATISTICS_ROUTE,
    MODERATOR_USERS_ROUTE,
    REQUESTS_ROUTE, USERS_LIST_ROUTE
} from "../../utils/consts/paths.js";

const ModeratorScene = props => {
    return (
        <Routes>
            <Route path={'/'} element={<ModeratorLayout/>}>
                <Route index element={<Navigate to={REQUESTS_ROUTE} replace/>} />
                <Route path={REQUESTS_ROUTE} element={<RequestsLayout />}>
                    <Route index element={<Navigate to={AWAIT_REQUESTS_ROUTE} replace/>} />
                    <Route path={AWAIT_REQUESTS_ROUTE} element={<PublishRequests/>} />
                    <Route path={CONFIRM_REQUESTS_ROUTE} element={<ConfirmRequests />} />
                    <Route path={CANCEL_REQUESTS_ROUTE} element={<CancelRequests />} />
                </Route>
                <Route path={REQUESTS_ROUTE+'/:id'} element={<RequestViewPage />} />
                <Route path={MODERATOR_USERS_ROUTE} element={<UsersList />} />
                <Route path={MODERATOR_STATISTICS_ROUTE} element={<StatisticsUsers />} />
                <Route path={MODERATOR_USERS_ROUTE + '/:id'} element={<UserProfilePage />} />
            </Route>
        </Routes>
    );
};

ModeratorScene.propTypes = {

};

export default ModeratorScene;