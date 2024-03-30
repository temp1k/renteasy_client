import React from 'react';
import './css/textarea.css'

const CustomTextarea = ({label, ...props}) => {
    return (
        <div className={'textarea__group'}>
            <label>{label}</label>
            <textarea className={'textarea__field'} {...props}/>
        </div>


    );
};

export default CustomTextarea;