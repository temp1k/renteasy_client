import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import useForm from "../../hook/useForm.js";
import {PASSWORD_REGEXP} from "../../utils/validation.js";
import {loginUser} from "../../store/userSlice.js";
import {loginAPI} from "./api/index.js";
import {useUser} from "../../hook/useUser.js";

const initialFieldValues = {
    login: '',
    password: '',
}


const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/';
    const [error, setError] = useState('');
    const {login} = useUser()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('login' in fieldValues) {
            temp.login = fieldValues.login ? "" : "Логин не может быть пустым"
        }
        if ('password' in fieldValues) {
            temp.password = PASSWORD_REGEXP.test(fieldValues.password) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотя бы одну заглавную и одну прописные буквы, должен иметь спец. символы";
        }

        if (fieldValues === values)
            setErrors({
                ...temp
            });

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFieldValues, validate, 0)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(values)) {
            const form = e.target;

            loginAPI(values.login, values.password)
                .then(data => {
                    login(data, () => navigate(fromPage, {replace: true}))
                })
                .catch(err => {
                    setError(err.response.data?.detail || err.message)
                    console.error(err)
                })


        }

    }

    return (
        <div>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit} className={'form-auth'}>
                <span className="error-form">{error}</span>
                <div className={'form-group'}>
                    <input type="text" placeholder={'Логин'}
                           name={'login'} value={values.login}
                           onChange={handleInputChange}/>
                    <span className={'form-error-validate'}>{errors.login}</span>
                </div>
                <div className="form-group">
                    <input type="password" placeholder={'Пароль'}
                           name={'password'} value={values.password}
                           onChange={handleInputChange}
                    />
                    <span className={'form-error-validate'}>{errors.password}</span>
                </div>
                <button type={"submit"}>Войти</button>
            </form>

        </div>
    );
};

export {LoginPage};