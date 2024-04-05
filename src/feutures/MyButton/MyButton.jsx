import React from 'react';
import PropTypes from 'prop-types';
import './css/mybutton.css'
import {Spinner} from "react-bootstrap";

const MyButton = ({loading = false, ...props}) => {
    return (
        <button {...props} className={props.className + ' btn__custom_style'}>
            {loading && <Spinner size="sm" animation={"border"} role={"status"}>
                <span className={"sr-only"}></span>
            </Spinner>}
            {props.children}</button>
    );
};

MyButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
};

export default MyButton;