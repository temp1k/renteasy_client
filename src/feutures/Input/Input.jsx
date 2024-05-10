import React from 'react';
import './css/input.css'
import PropTypes from 'prop-types';

const Input = ({label = '', error, className, labelClassName, ...props}) => {
    if (!label)
        return (
            <input className={'my__input'} {...props}/>
        );

    return (
        <div className={'input__group'}>
            <label htmlFor="" className={"input__label " + labelClassName}>{label}</label>
            <input className={'my__input ' + className} {...props}/>
            <span className="error__input">{error}</span>
        </div>
    )
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
};

export default Input;