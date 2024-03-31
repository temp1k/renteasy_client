import React from 'react';
import './css/textarea.css'
import PropTypes from "prop-types";

const CustomTextarea = ({label, error, ...props}) => {
    return (
        <div className={'textarea__group'}>
            <label>{label}</label>
            <textarea className={'textarea__field'} {...props}/>
            <span className="error__input">{error}</span>
        </div>


    );
};

CustomTextarea.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
}

export default CustomTextarea;