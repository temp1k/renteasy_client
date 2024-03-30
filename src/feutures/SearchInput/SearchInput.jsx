import React from 'react';
import {MdCancel} from "react-icons/md";
import './css/search_input.css'

const SearchInput = ({click, ...props}) => {
    return (
        <div className="input-with-button">
            <input type="text" className={'input__search'} placeholder="Введите текст" {...props}/>
            <MdCancel className={'button__search'} onClick={(e) => click()}/>
        </div>
    );
};

export default SearchInput;