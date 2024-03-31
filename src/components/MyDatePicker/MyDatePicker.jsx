import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './my_datepicker.css'

const MyDatePicker = ({date, setDate}) => {

    return (
        <div className={'container_date'}>
            <label>Выберите дату:</label>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
            />
        </div>
    );
};

MyDatePicker.propTypes = {
    
};

export default MyDatePicker;