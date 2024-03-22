import React from 'react';
import './css/input.css'
import PropTypes from 'prop-types';

const Input = props => {
    return (
        <div>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;