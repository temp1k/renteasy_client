import React from 'react';
import {useParams, useNavigate} from "react-router-dom";

const PublishHousingPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <div>
            <button onClick={goBack}>Назад</button>
            <h3>Страница жилья {id}</h3>
        </div>
    );
};

export {PublishHousingPage};