import React from 'react';
import PropTypes from 'prop-types';

const MySelect = ({items, label}) => {
    return (
        <div>
            <label>{label}</label>
            <select>
                {items.map(item =>
                    <option value={item.id} key={item.id}>{item.name}</option>
                )}
            </select>
        </div>
    );
};

MySelect.propTypes = {
    items: PropTypes.array,
    label: PropTypes.string,
};

export default MySelect;