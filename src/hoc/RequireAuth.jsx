import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, NO_PERMISSIONS_ROUTE} from "../utils/consts/paths.js";
import PropTypes, {bool} from "prop-types";
import {useUser} from "../hook/useUser.js";


const RequireAuth = ({requireRoles=[], unrequireRoles= [], children}) => {
    const location = useLocation();
    const {currentUser} = useUser()

    // Проверка авторизации
    if (!currentUser.isAuth) {
        return <Navigate to={LOGIN_ROUTE} state={{from: location}} />
    }
    // Проверка наличие ролей
    const has_perm = currentUser.roles.some(element => requireRoles.includes(element)) || !requireRoles.length
    if (!has_perm) {
        return <Navigate to={NO_PERMISSIONS_ROUTE} />
    }
    const no_has_perm = currentUser.roles.some(element => unrequireRoles.includes(element))
    if (no_has_perm) {
        console.log('no')
        return <Navigate to={HOME_ROUTE} />
    }

    return children
};

RequireAuth.propTypes = {
    children: PropTypes.element.isRequired,
    requireRoles: PropTypes.arrayOf(PropTypes.string),
    unrequireRoles: PropTypes.arrayOf(PropTypes.string)
}

export {RequireAuth};