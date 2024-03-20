import React from 'react';
import {useParams} from "react-router-dom";

const PublishHousingPage = () => {
    const {id} = useParams()

    return (
        <div>
            Страница жилья {id}
        </div>
    );
};

export default PublishHousingPage;