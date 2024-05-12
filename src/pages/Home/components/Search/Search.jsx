import {useEffect, useState} from 'react';
import './search.css'
import {ButtonSearch} from "../../../../components/index.js";
import {getAllDistrictsAPI} from "../../../../http/api/districtAPI.js";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const Search = ({fetchFunc}) => {
    const [name, setName] = useState('')
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
        getAllDistrictsAPI()
            .then(data => {
                setDistricts(data)
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

        fetchFunc(district, name, startDateJson, endDateJson)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={'container__search'}>
                <select className={'field select_country'}
                        id={'select_country'}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                >
                    <option value="">Выберите округ...</option>
                    {districts.map(district =>
                        <option key={district.id} value={district.id}>{district.name}</option>
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

Search.propTypes = {
    fetchFunc: PropTypes.func,
}

export default Search;