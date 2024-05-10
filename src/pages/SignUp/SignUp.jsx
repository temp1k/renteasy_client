import React, {useState} from 'react';
import useForm from "../../hook/useForm.js";
import {Input, MyButton} from "../../feutures";
import {EMAIL_REGEXP, PASSWORD_REGEXP} from "../../utils/validation.js";
import s from './Reg.module.css'
import './reg.css'
import {USER_ROLE} from "../../utils/consts/roles.js";
import {regAPI} from "../../http/api/authAPI.js";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts/paths.js";

const defaultValues = {
    username: "",
    email: '',
    password: "",
    repeatPassword: '',
    first_name: "",
    last_name: "",
    patronymic: "",
    passport_series: "",
    passport_number: "",
    passport_from: "",
    passport_registration_address: "",

};

const SignUp = () => {
    const navigate = useNavigate()
    const [globalError, setGlobalError] = useState('')
    const [loading, setLoading] = useState(false)

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
        if ('first_name' in fieldValues) {
            temp.first_name = fieldValues.first_name ? "" : "Введите ваше имя"
        }
        if ('last_name' in fieldValues) {
            temp.last_name = fieldValues.last_name ? "" : "Введите вашу фамилию"
        }
        if ('repeatPassword' in fieldValues) {
            temp.repeatPassword = fieldValues.password === fieldValues.repeatPassword ? '' : 'Пароли не совпадают'
        }
        if ('passport_series' in fieldValues) {
            temp.passport_series = fieldValues.passport_series.length < 4 ? "Введите корректную серию паспорта" : ""
        }
        if ('passport_number' in fieldValues) {
            temp.passport_number = fieldValues.passport_number.length < 6 ? "Введите корректный номер паспорта" : ""
        }
        if ('passport_from' in fieldValues) {
            temp.passport_from = fieldValues.passport_from ? "" : "Заполните данное поле"
        }
        if ('passport_registration_address' in fieldValues) {
            temp.passport_registration_address = fieldValues.passport_registration_address ? "" : "Заполните данное поле"
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
        if (validate()) {
            setLoading(true)
            const newUser = {
                username: values.username,
                email: values.email,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
                patronymic: values.patronymic,
                passport_series: values.passport_series,
                passport_number: values.passport_number,
                passport_from: values.passport_from,
                passport_registration_address: values.passport_registration_address,
                groups_str: USER_ROLE
            }
            regAPI(newUser)
                .then(data => {
                    console.log(data)
                    navigate(LOGIN_ROUTE, {replace: true})
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                    setGlobalError(err.response?.data?.username || 'Непредвиденная ошибка')
                })
        }
    }

    return (
        <div className={'registration'}>
            <form onSubmit={handleSubmit} className={'form-center w-75'}>
                <div className="form__header">Зарегистрируйтесь</div>
                <div className="form__error">{globalError}</div>
                <div className={s.container_fields}>
                    <div>
                        <div className='input__group'>
                            <Input name={'username'} placeholder={'Логин'}
                                   label={'Логин'}
                                   value={values.username}
                                   onChange={handleInputChange}
                            />
                            <span className='input__error'>{errors.username}</span>
                        </div>
                        <div className='input__group'>
                            <Input name={'email'} placeholder={'Эл. почта'}
                                   label={'Почта'}
                                   value={values.email}
                                   onChange={handleInputChange}
                            />
                            <span className='input__error'>{errors.email}</span>
                        </div>
                        <div className='input__group'>
                            <Input name={'password'} placeholder={'Пароль'}
                                   label={'Пароль'} type={'password'}
                                   value={values.password}
                                   onChange={handleInputChange}
                            />
                            <span className='input__error'>{errors.password}</span>
                        </div>
                        <div className='input__group'>
                            <Input name={'repeatPassword'} placeholder={'Проверка пароля'}
                                   label={'Повторие пароль'} type={'password'}
                                   value={values.repeatPassword}
                                   onChange={handleInputChange}
                            />
                            <span className='input__error'>{errors.repeatPassword}</span>
                        </div>
                    </div>
                    <div>
                        <div className={s.container_FIO}>
                            <Input name={'first_name'} placeholder={'Имя'}
                                   label={'Имя'}
                                   value={values.first_name}
                                   onChange={handleInputChange}
                                   error={errors.first_name}
                            />
                            <Input name={'last_name'} placeholder={'Фамилия'}
                                   label={'Фамилия'}
                                   value={values.last_name}
                                   onChange={handleInputChange}
                                   error={errors.last_name}
                            />
                            <Input name={'patronymic'} placeholder={'Отчество'}
                                   label={'Отчество (если есть)'}
                                   value={values.patronymic}
                                   onChange={handleInputChange}
                                   error={errors.patronymic}
                            />
                        </div>
                        <div>
                            <h6>Паспортные данные</h6>
                            <div className={'w-75'}>
                                <div className={s.container_passport_number}>
                                    <Input name={'passport_series'}
                                           label={'Серия'}
                                           value={values.passport_series}
                                           onChange={handleInputChange}
                                           error={errors.passport_series}
                                           className={s.input_passport}
                                           type={"text"}
                                           pattern="\d{4}" maxlength="4"
                                           title="Пожалуйста, введите ровно 4 цифры"
                                    />
                                    <Input name={'passport_number'}
                                           label={'Номер'}
                                           value={values.passport_number}
                                           onChange={handleInputChange}
                                           error={errors.passport_number}
                                           className={s.input_passport}
                                           pattern="\d{6}" maxlength="6"
                                           title="Пожалуйста, введите ровно 6 цифры"
                                    />
                                </div>
                                <Input name={'passport_from'} placeholder={'Кем выдан'}
                                       label={'Кем выдан'}
                                       value={values.passport_from}
                                       onChange={handleInputChange}
                                       error={errors.passport_from}
                                />
                                <Input name={'passport_registration_address'} placeholder={'Регистрация'}
                                       label={'Зарегистрирован по адресу: '}
                                       value={values.passport_registration_address}
                                       onChange={handleInputChange}
                                       error={errors.passport_registration_address}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MyButton loading={loading} type={'submit'}>Зарегистрироваться</MyButton>
            </form>

        </div>
    );
};

SignUp.propTypes = {};

export {SignUp};