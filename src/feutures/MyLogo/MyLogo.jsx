import React from 'react';
import {HOME_ROUTE} from "../../utils/consts/paths.js";
import {Link} from "react-router-dom";

const MyLogo = () => {
    return (
        <Link to={HOME_ROUTE}
              className={'navbar-brand'}
              style={{color: 'var(--second-color)'}}

        >RENTEASY</Link>
    );
};

export default MyLogo;