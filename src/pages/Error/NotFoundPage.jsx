import React from 'react';

const NotFoundPage = ({text='Извините, такой страницы не существует'}) => {
    return (
        <div id="error-page">
            <h1>Ой-ой</h1>
            <p>{text}</p>
            <p>{404}</p>
            <p>
                <i>Страница не найдена</i>
            </p>
        </div>
    );
};

export default NotFoundPage