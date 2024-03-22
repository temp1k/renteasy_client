import React from 'react';
import {Link, useMatch} from "react-router-dom";


// eslint-disable-next-line react/prop-types
const CustomLink = ({children, to, ...props}) => {
    const match = useMatch({
        path: to,
        // eslint-disable-next-line react/prop-types
        end: to.length === 1
    });
    return (
        <Link
            to={to}
            style={{
                color: match ? 'var(--second-color)' : 'var(--main-color)'
            }}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;