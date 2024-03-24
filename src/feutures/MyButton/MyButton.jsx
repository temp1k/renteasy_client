import React from 'react';
import PropTypes from 'prop-types';
import './css/mybutton.css'

const MyButton = props => {
    return (
        <button onClick={props.onClick} type={props.type} className={props.className + ' btn__custom_style'}>{props.children}</button>
    );
};

MyButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func
};

export default MyButton;