import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {BsFillQuestionSquareFill} from "react-icons/bs";
import s from './LinkGuide.module.css'
import {getGuideByUser} from "../../http/api/usersAPI.js";
import {getErrorText} from "../../utils/helpers.js";

const LinkGuide = props => {
    const [link, setLink] = useState('')

    useEffect(() => {
        getGuideByUser()
            .then(data => {
                setLink(data.guide)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);


    if (!link) {
        return <></>
    }

    return (
        <a
            href={link}
            {...props}
            className={s.link_container + ' ' + props.className}
        >
            <BsFillQuestionSquareFill className={s.icon}/>
            <span className={s.text}>Скачать руководство пользователя</span>

        </a>
    );
};

LinkGuide.propTypes = {
    className: PropTypes.string,
};

export default LinkGuide;