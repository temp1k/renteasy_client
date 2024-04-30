import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './css/customlinkbutton.css'

const CustomLinkButton = ({children, variant, to, ...props}) => {
    props.className += ` my-btn my-btn-${variant} no-link`
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
    variant: PropTypes.oneOf(
        ['primary', 'secondary', 'dark', 'white']
    ),
}

export default CustomLinkButton;