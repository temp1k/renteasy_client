import React from 'react';
import PropTypes from 'prop-types';
import './button_search.css'
import { FaSearch } from "react-icons/fa";


const ButtonSearch = ({className, ...props}) => {

    const classes = className + ' button__search';

    return (
        <button
            className={classes}
            {...props}
        >
            <FaSearch />
        </button>
    );
};

ButtonSearch.propTypes = {

};

export default ButtonSearch;