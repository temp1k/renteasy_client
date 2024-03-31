import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {ButtonBack} from "../../components/index.js";

const PublishHousingPage = () => {
    const {id} = useParams()

    return (
        <div>
            <ButtonBack>Назад</ButtonBack>
            <h3>Страница жилья {id}</h3>
        </div>
    );
};

export {PublishHousingPage};