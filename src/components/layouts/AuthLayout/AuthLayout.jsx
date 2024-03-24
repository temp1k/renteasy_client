import React from 'react';
import {Outlet} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../utils/consts/paths.js";
import {CustomLink} from "../../../feutures/index.js";
import './css/index.css'

const AuthLayout = () => {
    return (
        <div>
            <div className='nav-auth'>
                <CustomLink to={LOGIN_ROUTE} className={'nav-link'}>Авторизация</CustomLink>
                |
                <CustomLink to={REGISTRATION_ROUTE} className={'nav-link'}>Регистрация</CustomLink>
            </div>
            <Outlet />
        </div>
    );
};

export {AuthLayout};