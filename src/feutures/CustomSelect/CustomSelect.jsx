import React from 'react';
import PropTypes from 'prop-types';
import './custom_select.css'

const CustomSelect = ({children, label, ...props}) => {
    const selectId = Date.now().toString();

    return (
        <div className={'select__container'}>
            <label htmlFor={selectId}>{label}</label>
            <select
                id = {selectId}
                {...props}
                className={'select'}
            >
                {children}
            </select>
        </div>

    );
};

CustomSelect.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string,
};

export {CustomSelect};