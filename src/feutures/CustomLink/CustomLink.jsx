import React, {useState} from 'react';
import {Link, useLocation, useMatch} from "react-router-dom";
import './custom_link.css'


// eslint-disable-next-line react/prop-types
const CustomLink = ({children, to, absolutePath=to, ...props}) => {
    const match = useMatch({
        path: absolutePath,
        // eslint-disable-next-line react/prop-types
        end: to.length === 1
    });
    if (match) {
        props.className += ' active'
    }

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link
            to={to}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                color: match ? 'var(--second-color)' : 'var(--main-color)',
                transform: isHovered ? 'scale(1.08)' : 'none',
                transition: 'transform 0.3s'
            }}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;