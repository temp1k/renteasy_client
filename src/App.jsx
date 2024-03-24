import './App.css'
import React, {useEffect, useState} from "react";
import {Main} from "./scences/index.js";
import {refreshTokenAPI} from "./http/api/authAPI.js";
import {useUser} from "./hook/useUser.js";
import {CenterLoading} from "./feutures/index.js";


function App() {
    const {updateUserByJwt} = useUser()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) {
            setLoading(false)
            return
        }

        refreshTokenAPI(refreshToken)
            .then(data => {
                const jwt = {access: data}
                updateUserByJwt(jwt).then(result => setLoading(false)).catch(err => setLoading(false))
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, []);

    if (loading) {
        return (
            <div className="h-100">
                <CenterLoading />
                aboba
            </div>
        )
    }

    return (
        <>
            <Main/>
        </>
    )
}

export default App
