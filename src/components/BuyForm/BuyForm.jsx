import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './buy_form.css'
import DatePicker from "react-datepicker";
import {MyButton} from "../../feutures/index.js";
import {differenceDatesInDays} from "../../utils/helpers.js";

const BuyForm = ({publishHousing}) => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [count, setCount] = useState('')
    const [days, setDays] = useState(0)
    const [priceForDays, setPriceForDays] = useState(0)
    let priceForRent = 250 * days
    let totalPrice = priceForDays + priceForRent

    let [minDate, maxDate] = [new Date(publishHousing.date_begin), new Date(publishHousing.date_end)]

    let housing = publishHousing.housing_d


    useEffect(() => {
        let price = parseFloat(days) * parseFloat(count) * parseFloat(publishHousing.price)
        if (!price) setPriceForDays(0)
        else setPriceForDays(price)
    }, [days, count]);

    useEffect(() => {
        if (!startDate || !endDate) {
            setDays(0)
            return
        }

        setDays(differenceDatesInDays(startDate, endDate))
    }, [startDate, endDate]);

    const changeNumberHandle = (e) => {
        const value = e.target.value;

        if (value === '') {
            setCount(value);
            return;
        }

        // Проверяем, является ли введенное значение положительным числом и не превышает ли 10
        console.log(publishHousing.number_of_seats)
        if (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= parseFloat(housing.number_of_seats)) {
            setCount(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Бронирование')
    }

    return (
        <div className="container_brone">
            <p className={'price'}><span>{publishHousing.price} {publishHousing.currency_d.publish_name}</span> за день</p>
            <form onSubmit={handleSubmit}>
                <div className="container_buy_form">
                    <div className={'field_container first_datepicker'}>
                        <span className={'field_label'}>Прибытие</span>
                        <DatePicker
                            className={'field_buy_form datepicker_buy_form'}
                            id={'start_date'}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd.MM.yyyy"
                            isClearable
                            placeholderText="Прибытие"
                            selectsStart
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                    <div className="field_container">
                        <span className={'field_label'}>Отъезд</span>
                        <DatePicker
                            id={'end_date'}
                            className={'field_buy_form datepicker_buy_form'}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd.MM.yyyy"
                            isClearable
                            placeholderText="Отъезд"
                            selectsEnd
                            minDate={startDate}
                            maxDate={maxDate}
                        />
                    </div>
                    <div className="field_container number_buy_form">
                        <span className={'field_label'}>Сколько поедет</span>
                        <input type={'number'}
                               className={'field_buy_form'}
                               min={'0'} max={housing.number_of_seats}
                               pattern={'/^\\d*\\.?\\d*$/'}
                               placeholder={'Сколько поедет'}
                               name={'number_of_seats'}
                               value={count}
                               onChange={changeNumberHandle}
                               id={'input_name'}
                        />
                    </div>
                </div>
                <MyButton
                    className={'btn_buy_form'}
                    type={'submit'}
                    disabled={!endDate || !startDate || !count}
                >
                    Зарбронировать
                </MyButton>
                <div className={'container_prices'}>
                    <div className="price_one">
                        <span className={'info_price'}>Цена без комиссии за {days} дней</span>
                        <span className={'result__price'}>{priceForDays} {publishHousing.currency_d.publish_name}</span>
                    </div>
                    <div className="price_one">
                        <span className={'info_price'}>Сервисный сбор RENTEASY</span>
                        <span className={'result__price'}>{priceForRent} {publishHousing.currency_d.publish_name}</span>
                    </div>
                </div>
                <hr/>
                <div className="container_total_price">
                    <span className={'info_price'}>Всего</span>
                    <span className={'result__price'}>{totalPrice} {publishHousing.currency_d.publish_name}</span>
                </div>
            </form>
        </div>
    );
};

BuyForm.propTypes = {
    publishHousing: PropTypes.object,
};

export default BuyForm;