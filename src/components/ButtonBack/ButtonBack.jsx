import React from 'react';
import {useNavigate} from "react-router-dom";

const ButtonBack = ({children, ...props}) => {
    const navigate = useNavigate()

    const clickBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <button type={'button'} onClick={clickBack} {...props}>{children}</button>
    );
};

export default ButtonBack;