import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import useForm from "../../hook/useForm.js";
import {PASSWORD_REGEXP} from "../../utils/validation.js";
import {loginAPI} from "../../http/api/authAPI.js";
import {useUser} from "../../hook/useUser.js";
import {Input, MyButton} from "../../feutures/index.js";

const initialFieldValues = {
    login: '',
    password: '',
}


const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
            setLoading(true)
            loginAPI(values.login, values.password)
                .then(data => {
                    login(data, () => navigate(fromPage, {replace: true}))
                    setLoading(false)
                })
                .catch(err => {
                    setError(err.response.data?.detail || err.message)
                    console.error(err)
                    setLoading(false)
                })
        }
    }

    return (
        <div className={'container-center mt-5'}>
            <form onSubmit={handleSubmit} className={'form-center'}>
                <div className={'form__header'}>Войдите</div>
                <span className="form__error">{error}</span>
                <div className={'input__group'}>
                    <Input type="text" placeholder={'Логин'}
                           name={'login'} value={values.login}
                           onChange={handleInputChange}/>
                    <span className={'input__error'}>{errors.login}</span>
                </div>
                <div className="input__group">
                    <Input type="password" placeholder={'Пароль'}
                           name={'password'} value={values.password}
                           onChange={handleInputChange}
                    />
                    <span className={'input__error'}>{errors.password}</span>
                </div>
                <MyButton loading={loading} type={"submit"}>Войти</MyButton>
            </form>

        </div>
    );
};

export {LoginPage};