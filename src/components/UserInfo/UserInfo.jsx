import PropTypes from 'prop-types';
import {Input, MyButton, SuccessAlert} from "../../feutures/index.js";
import useForm from "../../hook/useForm.js";
import {EMAIL_REGEXP, PASSWORD_REGEXP} from "../../utils/validation.js";
import {Container} from "react-bootstrap";
import s from "./UserInfo.module.css"
import React, {useState} from "react";
import {BiSolidArrowFromTop, BiSolidArrowToTop} from "react-icons/bi";
import {CheckCodeModal} from "../Modals/index.js";
import {changeUserAPI} from "../../http/api/authAPI.js";
import {getErrorText, getRole} from "../../utils/helpers.js";

let initialValues = {
    email: '',
    first_name: '',
    groups: [],
    id: 0,
    is_active: false,
    is_success: false,
    last_name: '',
    patronymic: '',
    username: '',
}

const UserInfo = ({user, setUser, ...props}) => {
    const [activeChangeFieldsModal, setActiveChangeFieldsModal] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);
    const [isActiveChange, setIsActiveChange] = useState(false)
    const validate = (fieldValues = values) => {
        let temp = {...errors}
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

        if (fieldValues === values) setErrors({
            ...temp
        });

        return Object.values(temp).every(x => x === "")
    }


    const {
        values, setValues, errors, setErrors, resetForm, handleInputChange

    } = useForm(user, validate)

    const toggleExpansion = () => {
        setIsExpanded(prevState => !prevState);
    };

    const reset = () => {
        setIsActiveChange(false)
        resetForm()
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            if (user !== values)
                setActiveChangeFieldsModal(true)
        }
    }

    const updateUser = () => {
        changeUserAPI(user.id, values)
            .then(data => {
                setValues(data)
                setIsActiveChange(false)
                setUser(data)
                SuccessAlert(
                    'Успешное обновление',
                    'Вы успешно обновили ваш профиль'
                )
            })
            .catch(err => {
                console.error(err)
                alert('ОШИБКА ОБНОВЛЕНИЯ ПРОФИЛЯ\n' + getErrorText(err))
            })
    }

    return (
        <Container className='mb-3'>
            <form onSubmit={handleFormSubmit} className={s.container_form}>
                <div>
                    <Input name={'username'} placeholder={'Логин'}
                           label={'Логин'}
                           value={values.username} error={errors.username}
                           onChange={handleInputChange}
                           disabled={true}
                    />
                    <Input name={'email'} placeholder={'Почта'}
                           label={'Почта'}
                           value={values.email} error={errors.email}
                           onChange={handleInputChange}
                           disabled={!isActiveChange}
                    />
                </div>
                <div>
                    <div className={s.container_FIO}>
                        <Input name={'first_name'} placeholder={'Имя'}
                               label={'Имя'}
                               value={values.first_name}
                               onChange={handleInputChange}
                               error={errors.first_name}
                               disabled={!isActiveChange}
                        />
                        <Input name={'last_name'} placeholder={'Фамилия'}
                               label={'Фамилия'}
                               value={values.last_name}
                               onChange={handleInputChange}
                               error={errors.last_name}
                               disabled={!isActiveChange}
                        />
                        <Input name={'patronymic'} placeholder={'Отчество'}
                               label={'Отчество'}
                               value={values.patronymic}
                               onChange={handleInputChange}
                               error={errors.patronymic}
                               disabled={!isActiveChange}
                        />
                    </div>
                    <div className={s.container_role}>Статус: {getRole(user.groups[0])}</div>
                </div>
                <div className={s.container_passport}>
                    <div>
                    <span className={s.button_passport}
                          onClick={toggleExpansion}>
                        {isExpanded ? <BiSolidArrowToTop/> : <BiSolidArrowFromTop/>}Паспортные данные
                    </span>
                        {isExpanded && (<div>
                            <div className={s.container_fields_passport}>
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
                                           disabled={!isActiveChange}
                                    />
                                    <Input name={'passport_number'}
                                           label={'Номер'}
                                           value={values.passport_number}
                                           onChange={handleInputChange}
                                           error={errors.passport_number}
                                           className={s.input_passport}
                                           pattern="\d{6}" maxlength="6"
                                           title="Пожалуйста, введите ровно 6 цифры"
                                           disabled={!isActiveChange}
                                    />
                                </div>
                                <Input name={'passport_from'} placeholder={'Кем выдан'}
                                       label={'Кем выдан'}
                                       value={values.passport_from}
                                       onChange={handleInputChange}
                                       error={errors.passport_from}
                                       disabled={!isActiveChange}
                                />
                                <Input name={'passport_registration_address'} placeholder={'Регистрация'}
                                       label={'Зарегистрирован по адресу: '}
                                       value={values.passport_registration_address}
                                       onChange={handleInputChange}
                                       error={errors.passport_registration_address}
                                       disabled={!isActiveChange}
                                />
                            </div>
                        </div>)}
                    </div>
                </div>
                <div className={s.container_buttons_form}>
                    {isActiveChange &&
                        <MyButton
                            type={'submit'}
                            variant={'secondary'}
                            disabled={initialValues === values}
                        >
                            Изменить
                        </MyButton>
                    }
                    {isActiveChange &&
                        <MyButton
                            type={'button'}
                            variant={'danger'}
                            onClick={reset}
                        >
                            Сбросить
                        </MyButton>
                    }
                    {!isActiveChange &&
                        <MyButton
                            type={'button'}
                            onClick={() => {
                                setIsActiveChange(true)
                            }}
                        >
                            Редактировать
                        </MyButton>
                    }
                </div>
            </form>
            <CheckCodeModal
                setActive={setActiveChangeFieldsModal}
                active={activeChangeFieldsModal}
                email={values.email}
                success_callback={() => updateUser()}
                canceled_callback={() => reset()}
            />
        </Container>);
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired, setUser: PropTypes.func,
};

export default UserInfo;