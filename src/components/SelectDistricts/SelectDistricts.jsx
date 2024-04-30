import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from "react-select/async";
import {getAllDistrictsAPI} from "../../http/api/districtAPI.js";

const SelectDistricts = ({selectedDistrict, setSelectedDistrict, error}) => {
    const [defaultItems, setDefaultItems] = useState([])

    useEffect(() => {
        getAllDistrictsAPI()
            .then(data => {
                setDefaultItems(data.map(i => ({label: i.name, value: i.id})))
            })
            .catch(err => {
                console.warn(err)
            })
    }, []);

    const onChangeHandle = (e) => {
        setSelectedDistrict(e)
    }

    const loadOptions = async (
        inputValue,
        callback
    ) => {
        let districts = []
        districts = await getAllDistrictsAPI({name_like: inputValue})
            .catch(err => {
                console.warn(err)
            })
        callback(districts.map(i => ({label: i.name, value: i.id})))
    };

    return (
        <div className={'container_field'}>
            <label htmlFor="selectDistrict" className="input__label">Округ:</label>
            <AsyncSelect
                id='selectDistrict'
                className={'select_form_container'}
                classNamePrefix={'select_prefix'}
                placeholder="Выберите округ..."
                value={selectedDistrict}
                onChange={onChangeHandle}
                loadOptions={loadOptions}
                defaultOptions={defaultItems}
            />
            <span className="error__input">{error}</span>
        </div>
    );
};

SelectDistricts.propTypes = {
    selectedDistrict: PropTypes.object,
    setSelectedDistrict: PropTypes.func,
    error: PropTypes.string,
};

export default SelectDistricts;