import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getUrlServer} from "../../http/api/authAPI.js";
import s from './Link.module.css'
import {CenterLoading} from "../../feutures/index.js";

const LinkToAdminPanel = props => {
    const [linkToAdmin, setLink] = useState('#')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUrlServer()
            .then(data => {
                setLink(data + '/admin')
                setLoading(false)
            })
    }, []);

    if (!linkToAdmin) {
        return (
            <></>
        )
    }


    return (
        <a
            href={linkToAdmin}
            target="_blank"
            {...props}
            className={props.className+' '+s.link}
        >{loading ? <CenterLoading/> : props.children}</a>
    );
};

LinkToAdminPanel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default LinkToAdminPanel;