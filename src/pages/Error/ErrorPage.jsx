import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({errorMessage, ...props}) => {
    return (
        <div id="error-page"
            className={'container d-flex justify-content-center'}
        >
            <div
                 {...props}
                className={'w-50 mt-5'}
            >
                <h1>Упс!</h1>
                <p>Извиняемся, что-то пошло не так</p>
                <p>
                    <i>{errorMessage || 'Непредвиденная ошибка'}</i>
                </p>
            </div>
        </div>
    );
};

ErrorPage.propTypes = {
    errorMessage: PropTypes.string,
};

export default ErrorPage;