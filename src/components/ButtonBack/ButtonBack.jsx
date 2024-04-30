import React from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import './button_back.css'
import {IoArrowBack} from "react-icons/io5";

const ButtonBack = ({children, ...props}) => {
    const navigate = useNavigate()

    const clickBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <button type={'button'}
                onClick={clickBack}
                {...props}
                className={'my_btn_back'}
        >
            <IoArrowBack />
            {/*{children}*/}
        </button>
    );
};

ButtonBack.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default ButtonBack;