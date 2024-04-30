import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";

const UserProfilePage = props => {
    const {id} = useParams()
    return (
        <div>
            Страница профиля пользователя с id {id}
        </div>
    );
};

UserProfilePage.propTypes = {};

export default UserProfilePage;