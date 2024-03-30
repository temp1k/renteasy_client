import React from 'react';
import {useParams} from "react-router-dom";

const HousingViewPage = () => {
    const {id} = useParams()

    return (
        <div>
            Страница жилья {id}
        </div>
    );
};

export default HousingViewPage;