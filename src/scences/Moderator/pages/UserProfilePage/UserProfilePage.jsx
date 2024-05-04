import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import {getUserById} from "../../../../http/api/usersAPI.js";
import {formatJsonDateTo_ddMMyyyy_HHmm, getErrorText} from "../../../../utils/helpers.js";
import {CenterLoading} from "../../../../feutures/index.js";
import {MyContainer} from "../../../../feutures/MyContainer/index.js";
import {ButtonBack, ButtonBlockUser} from "../../../../components/index.js";
import s from './UserProfile.module.css'

const Field = ({title, data}) => {
    return (
        <div className={s.container_field}>
            <span className={s.field_title}>{title}</span>
            <span className={s.field_data}>{data.replace(/\s/g, '') ? data : 'Пусто'}</span>
        </div>
    )
}
Field.propTypes = {
    title: PropTypes.string,
    data: PropTypes.string.isRequired,
}


const UserProfilePage = props => {
    const {id} = useParams()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getUserById(id)
            .then(data => {
                setUser(data)
                console.log(data)
            })
            .catch(err => {
                console.error(err)
                setError(getErrorText(err))
            })
            .finally(() => setLoading(false))
    }, []);

    if (loading)
        return (
            <div>
                <CenterLoading />
            </div>
        )

    if (error)
        return (
            <div>
                {error}
            </div>
        )

    return (
        <MyContainer className={s.container}>
            <ButtonBack />
            <h4>Профиль {user.username}</h4>
            <div className={s.fields}>
                <Field title={'Логин: '} data={user.username}/>
                <Field title={'Эл. почта: '} data={user.email}/>
                <Field title={'Имя: '} data={user.first_name+' '+user.last_name}/>
                <Field title={'Роль: '} data={user.groups[0]}/>
                <Field title={'Подтвержденная почта: '} data={user.is_success ? 'ДА' : 'НЕТ'}/>
                <Field title={'Статус: '} data={user.is_active ? 'Активен' : 'Заблокирован'}/>
                <Field title={'Дата регистрации: '} data={formatJsonDateTo_ddMMyyyy_HHmm(user.date_joined)}/>
            </div>
            <div>
                <ButtonBlockUser user={user} setUser={setUser}/>
            </div>
        </MyContainer>
    );
};

UserProfilePage.propTypes = {};

export default UserProfilePage;