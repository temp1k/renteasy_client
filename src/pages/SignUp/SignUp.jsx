import React, {useState} from 'react';
import useForm from "../../hook/useForm.js";
import {Input, MyButton} from "../../feutures";
import {EMAIL_REGEXP, PASSWORD_REGEXP} from "../../utils/validation.js";
import './css/index.css'
import {USER_ROLE} from "../../utils/consts/roles.js";
import {regAPI} from "../../http/api/authAPI.js";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts/paths.js";

const defaultValues = {
    username: "",
    email: '',
    password: "",
    repeatPassword: '',
};

const SignUp = () => {
    const navigate = useNavigate()
    const [globalError, setGlobalError] = useState('')

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('username' in fieldValues) {
            temp.username = fieldValues.username && fieldValues.username.length >= 6 ? "" : "Логин должен быть больше 6 символов"
        }
        if ('email' in fieldValues) {
            temp.email = EMAIL_REGEXP.test(fieldValues.email) ? "" : 'Неверный формат почты'
        }
        if ('password' in fieldValues) {
            temp.password = PASSWORD_REGEXP.test(fieldValues.password) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотя бы одну заглавную и одну прописные буквы, должен иметь спец. символы";
        }
        if ('repeatPassword' in fieldValues) {
            temp.repeatPassword = fieldValues.password === fieldValues.repeatPassword ? '' : 'Пароли не совпадают'
        }

        if (fieldValues === values)
            setErrors({
                ...temp
            });

        return Object.values(temp).every(x => x === "")
    }

    const {
        values, setValues,
        errors, setErrors,
        handleInputChange,
        resetForm
    } = useForm(defaultValues, validate)


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        if (validate()){
            const newUser = {
                username: values.username,
                email: values.email,
                password: values.password,
                groups_str: USER_ROLE
            }
            regAPI(newUser)
                .then(data => {
                    console.log(data)
                    navigate(LOGIN_ROUTE, {replace: true})
                })
                .catch(err => {
                    console.error(err)
                    setGlobalError(err.response?.data?.username || 'Непредвиденная ошибка')
                })
        }
        else {
            alert('Ошибка')
        }
    }

    return (
        <div className={'registration'}>
            <form onSubmit={handleSubmit} className={'form-center'}>
                <div className="form__header">Зарегистрируйтесь</div>
                <div className="form__error">{globalError}</div>
                <div className='input__group'>
                    <Input name={'username'} placeholder={'Логин'}
                           value={values.username}
                           onChange={handleInputChange}
                    />
                    <span className='input__error'>{errors.username}</span>
                </div>
                <div className='input__group'>
                    <Input name={'email'} placeholder={'Эл. почта'}
                           value={values.email}
                           onChange={handleInputChange}
                    />
                    <span className='input__error'>{errors.email}</span>
                </div>
                <div className='input__group'>
                    <Input name={'password'} placeholder={'Пароль'}
                           type={'password'}
                           value={values.password}
                           onChange={handleInputChange}
                    />
                    <span className='input__error'>{errors.password}</span>
                </div>
                <div className='input__group'>
                    <Input name={'repeatPassword'} placeholder={'Проверка пароля'}
                           type={'password'}
                           value={values.repeatPassword}
                           onChange={handleInputChange}
                    />
                    <span className='input__error'>{errors.repeatPassword}</span>
                </div>
                <MyButton type={'submit'}>Зарегистрироваться</MyButton>
            </form>

        </div>
    );
};

SignUp.propTypes = {

};

export {SignUp};