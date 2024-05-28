import React from 'react';
import {useLocation} from "react-router-dom";

const NoPermissionsPage = () => {
    const location = useLocation()
    const text = location.state?.text || '';


    return (
        <div>
            <h2>Упс, кажется у вас нет доступа к этой странице :(</h2>
            <h4>Ошибка 403</h4>
            {text}
        </div>
    );
};

export default NoPermissionsPage;