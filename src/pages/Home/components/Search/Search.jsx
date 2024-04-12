import React, {useEffect, useState} from 'react';
import './search.css'
import {ButtonSearch} from "../../../../components/index.js";
import {getAllCountriesAPI} from "../../../../http/api/countryAPI.js";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const Search = ({fetchFunc}) => {
    const [countries, setCountries] = useState([
        {id: 1, name: 'Россия'},
        {id: 2, name: 'Англия'},
        {id: 3, name: 'Финляндия'},
        {id: 4, name: 'Швеция'},
    ])

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
        getAllCountriesAPI()
            .then(data => {
                setCountries(data)
                console.log(data)
            })
            .catch(err => {
                console.error('Ошибка загрузки стран')
                console.error(err)
            })
    }, []);


    const submitHandler = (e) => {
        e.preventDefault()
        let startDateJson = startDate ? startDate.toJSON() : ''
        let endDateJson = endDate ? endDate.toJSON() : ''

        fetchFunc(country, name, startDateJson, endDateJson)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={'container__search'}>
                <select className={'field select_country'}
                        id={'select_country'}
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">Выберите страну...</option>
                    {countries.map(country =>
                        <option key={country.id} value={country.id}>{country.name}</option>
                    )}
                </select>
                <input type="text"
                       placeholder={'Название места...'}
                       className={'field input_name'}
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       id={'input_name'}
                />
                <DatePicker
                    className={'field datepicker'}
                    id={'start_date'}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                    selectsStart
                    isClearable
                    endDate={endDate}
                    maxDate={endDate}
                    placeholderText="Прибытие"
                />
                <DatePicker
                    className={'field datepicker last_input'}
                    id={'end_date'}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd.MM.yyyy"
                    selectsEnd
                    startDate={startDate}
                    minDate={startDate}
                    isClearable
                    placeholderText="Выезд"
                />
                <ButtonSearch
                    className={'position__search__button'}
                    type={'submit'}
                />
            </div>
        </form>
    );
};

Search.propTyps = {
    fetchFunc: PropTypes.func,
}

export default Search;