import React from 'react';
import './css/input.css'
import PropTypes from 'prop-types';

const Input = ({label = '', ...props}) => {
    if (!label)
        return (
            <input className={'my__input'} {...props}/>
        );

    return (
        <div className={'input__group'}>
            <label htmlFor="" className="input__label">{label}</label>
            <input className={'my__input'} {...props}/>
        </div>
    )
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;