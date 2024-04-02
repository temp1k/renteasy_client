import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.css'

const CustomCheckBox = ({label, yes, no, value, onChange, ...props}) => {

    return (
        <label className={'container__checkbox'}>
            {label}{' '}
            <input
                type="checkbox"
                onChange={onChange}
                {...props}
            />
            <svg
                className={`checkbox ${value ? "checkbox--active" : ""}`}
                // This element is purely decorative so
                // we hide it for screen readers
                aria-hidden="true"
                viewBox="0 0 15 11"
                fill="none"
            >
                <path
                    d="M1 4.5L5 9L14 1"
                    strokeWidth="2"
                    stroke={value ? "#fff" : "none"} // only show the checkmark when `isCheck` is `true`
                />
            </svg>
            {value ?
            <span className="span-checkbox span__active">{yes}</span>
                :
            <span className="span-checkbox span__no_active">{no}</span>
            }
        </label>
    );
};

CustomCheckBox.propTypes = {
    label: PropTypes.string,
    yes: PropTypes.string,
    no: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CustomCheckBox;