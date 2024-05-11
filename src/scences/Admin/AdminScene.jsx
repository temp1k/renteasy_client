import React from 'react';
import PropTypes from 'prop-types';
import {Navigate, Route, Routes} from "react-router-dom";
import {REQUESTS_ROUTE} from "../../utils/consts/paths.js";
import {Container} from "react-bootstrap";
import {LinkToAdminPanel} from "../../components/index.js";
import {ButtonBackup, ButtonRestore} from "./components/index.js";
import s from './style.module.css'

const AdminScene = props => {
    return (
        <Routes>
            <Route path={'/'} element={<AdminPage />} />
        </Routes>
    );
};

const AdminPage = props => {
    return (
        <Container>
            <div className={s.container_buttons}>
                <ButtonBackup />
                <ButtonRestore />
            </div>
            <LinkToAdminPanel>
                Админ панель
            </LinkToAdminPanel>
        </Container>
    )
}

export default AdminScene;