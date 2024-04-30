import './App.css'
import React, {useEffect, useState} from "react";
import {Main} from "./scences/index.js";
import {useUser} from "./hook/useUser.js";
import {CenterLoading} from "./feutures/index.js";
import {messages} from "./utils/consts/messages.js";
import {ErrorPage} from "./pages"


function App() {
    const {reloadUser} = useUser()
    const [loading, setLoading] = useState(true);
    let kostil = true
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const accessToken = localStorage.getItem('access')
        if (!accessToken) {
            setLoading(false)
            return
        }
        if (kostil) {
            console.log('ПРОВЕРКА')
            reloadUser(accessToken)
                .then(result => setLoading(false))
                .catch(err => {
                        console.log(err)
                        if (err.code === 'ERR_NETWORK') {
                            setErrorMessage(messages.ERR_NETWORK_MESSAGE)
                        }
                        setLoading(false)
                    }
                )
            // eslint-disable-next-line react-hooks/exhaustive-deps
            kostil = false
        }
    }, []);

    if (loading) {
        return (
            <div className="h-100">
                <CenterLoading/>
            </div>
        )
    }

    if (errorMessage) {
        return (
            <ErrorPage errorMessage={errorMessage}/>
        )
    }

    return (
        <>
            <Main/>
        </>
    )
}

export default App
