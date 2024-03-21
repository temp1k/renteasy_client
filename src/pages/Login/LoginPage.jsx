import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()


    const fromPage = location.state?.from?.pathname || '/';
    return (
        <div>
            <h2>Авторизация</h2>
            {fromPage}
            <form action="">
                <input type="text" placeholder={'Логин'}/>
                <input type="password" placeholder={'Пароль'}/>
                <button type={"submit"}>Войти</button>
            </form>

        </div>
    );
};

export {LoginPage};