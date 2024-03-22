import React from 'react';
import PropTypes from 'prop-types';

const MyButton = props => {
    return (
        <button type={props.type} className={props.class}>{props.children}</button>
    );
};

MyButton.propTypes = {
    type: PropTypes.string,
    class: PropTypes.string,
    children: PropTypes.element,
};

export default MyButton;