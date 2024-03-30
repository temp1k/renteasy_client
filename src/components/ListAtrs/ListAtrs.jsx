import React from 'react';
import {MyButton} from "../../feutures/index.js";
import './css/list_atrs.css'
import PropTypes from "prop-types";

const ListAtrs = ({items, onClick, label}) => {
    return (
        <div className="container__items">
            <div className={'selected__atr'}>
                <label>{label}</label>
                <div className={'list__atr'}>
                    {items.map(type =>
                        <div key={type.id} className={'item__atr'}>{type.name}</div>
                    )}
                </div>
            </div>
            <div className={'container__btn__atr'}>
                <MyButton type={'button'} onClick={onClick}>Добавить</MyButton>
            </div>
        </div>
    );
};

ListAtrs.propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func,
    label: PropTypes.string,
}

export default ListAtrs;