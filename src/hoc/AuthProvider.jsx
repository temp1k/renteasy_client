import {createContext, useState} from "react";

import React from 'react';
import PropTypes from "prop-types";
import {RequireAuth} from "./RequireAuth.jsx";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const signin = (newUser, callback) => {
        setUser(newUser)
        callback()
    }

    const signout = (callback) => {
        setUser(null)
        callback()
    }

    const value = {user, signin, signout}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
}
