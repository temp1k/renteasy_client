import React from 'react';
import PropTypes from 'prop-types';
import './css/mybutton.css'
import {Spinner} from "react-bootstrap";

const MyButton = ({loading = false, variant='primary', ...props}) => {
    return (
        <button {...props} className={props.className + ` btn__custom_style my-btn-${variant}`}
            disabled={loading || props.disabled}
        >
            {loading && <Spinner size="sm" animation={"border"} role={"status"}>
                <span className={"sr-only"}></span>
            </Spinner>}
            {props.children}
        </button>
    );
};

MyButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(
        ['primary', 'secondary', 'dark', 'white', 'danger', 'success']
    ),
    children: PropTypes.node,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default MyButton;