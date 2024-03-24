import React from 'react';
import './css/input.css'
import PropTypes from 'prop-types';

const Input = ({...props}) => {
    return (
        <input {...props}/>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;