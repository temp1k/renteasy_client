import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getUrlServer} from "../../http/api/authAPI.js";
import s from './Link.module.css'

const LinkToAdminPanel = props => {
    const [linkToAdmin, setLink] = useState('#')
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        getUrlServer()
            .then(data => {
                setLink(data + '/admin')
            })
    }, []);

    if (!linkToAdmin) {
        return (
            <></>
        )
    }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <a
            href={linkToAdmin}
            target="_blank"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // style={{
            //     color: 'var(--main-color)',
            //     transform: isHovered ? 'scale(1.08)' : 'none',
            //     transition: 'transform 0.3s'
            // }}
            {...props}
            className={props.className+' '+s.link}
        >{props.children}</a>
    );
};

LinkToAdminPanel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default LinkToAdminPanel;