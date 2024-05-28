import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getAllCitiesAPI} from "../../http/api/districtAPI.js";
import AsyncSelect from "react-select/async";

const SelectCities = ({selectedCity, setSelectedCity, error}) => {
    const [defaultItems, setDefaultItems] = useState([])

    useEffect(() => {
        getAllCitiesAPI()
            .then(data => {
                setDefaultItems(data.map(i => ({label: i.name, value: i.id})))
            })
            .catch(err => {
                console.warn(err)
            })
    }, []);

    const onChangeHandle = (e) => {
        setSelectedCity(e)
    }

    const loadOptions = async (
        inputValue,
        callback
    ) => {
        let items = []
        items = await getAllCitiesAPI({name_like: inputValue})
            .catch(err => {
                console.warn(err)
            })
        callback(items.map(i => ({label: i.name, value: i.id})))
    };

    return (
        <div className={'container_field'}>
            <label htmlFor="selectDistrict" className="input__label">Город:</label>
            <AsyncSelect
                id='selectDistrict'
                className={'select_form_container'}
                classNamePrefix={'select_prefix'}
                placeholder="Выберите город..."
                value={selectedCity}
                onChange={onChangeHandle}
                loadOptions={loadOptions}
                defaultOptions={defaultItems}
            />
            <span className="error__input">{error}</span>
        </div>
    );
};

SelectCities.propTypes = {
    selectedCity: PropTypes.any,
    setSelectedCity: PropTypes.func,
    error: PropTypes.string,
};

export default SelectCities;