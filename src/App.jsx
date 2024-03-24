import './App.css'
import React, {useEffect} from "react";
import {Main} from "./scences/index.js";
import {refreshTokenAPI} from "./http/api/authAPI.js";
import {useUser} from "./hook/useUser.js";


function App() {
    const {updateUserByJwt} = useUser()

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) return

        refreshTokenAPI(refreshToken)
            .then(data => {
                const jwt = {access: data}

                updateUserByJwt(jwt)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    return (
        <>
            <Main/>
        </>
    )
}

export default App
