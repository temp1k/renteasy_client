import './App.css'
import React, {useEffect, useState} from "react";
import {Main} from "./scences/index.js";
import {refreshTokenAPI} from "./http/api/authAPI.js";
import {useUser} from "./hook/useUser.js";
import {CenterLoading} from "./feutures/index.js";


function App() {
    const {reloadUser} = useUser()
    const [loading, setLoading] = useState(true);
    let kostil = true

    useEffect(() => {
        const accessToken = localStorage.getItem('access')
        if (!accessToken) {
            setLoading(false)
            return
        }
        if (kostil) {
            console.log('ПРОВЕРКА')
            reloadUser(accessToken).then(result => setLoading(false)).catch(err => setLoading(false))
            // eslint-disable-next-line react-hooks/exhaustive-deps
            kostil = false
        }
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
