import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/paths.js";
import PropTypes from "prop-types";
import {useAuth} from "../hook/useAuth.js";


const RequireAuth = ({children}) => {
    const location = useLocation();
    const {user} = useAuth();

    if (!user) {
        return <Navigate to={LOGIN_ROUTE} state={{from: location}} />
    }

    return children
};

RequireAuth.propTypes = {
    children: PropTypes.element.isRequired,
}

export {RequireAuth};