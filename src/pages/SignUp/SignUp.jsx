import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {} from "@hookform/";
import {Input, MyButton} from "../../feutures";

const defaultValues = {
    username: "",
    password: "",
    email: ''
};

const SignUp = () => {


    return (
        <div className={'registration'}>
            <div className="registration__header">Регистрация</div>
            <Input />
            <Input />
            <Input />
            <Input />
            <MyButton>Войти</MyButton>
        </div>
    );
};

SignUp.propTypes = {

};

export {SignUp};