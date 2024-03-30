import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './css/customlinkbutton.css'

const CustomLinkButton = ({children, to, ...props}) => {
    props.className += ' my-btn no-link'
    return (
        <Link
            to={to}
            {...props}
        >{children}</Link>
    );
};

CustomLinkButton.propTypes = {
    children: PropTypes.any,
    to: PropTypes.string,
}

export default CustomLinkButton;