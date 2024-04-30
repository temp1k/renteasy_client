import React from 'react';
import {CustomLink} from "../../../../feutures/index.js";
import {
    HOME_ROUTE, MODERATOR_SCENE_ROUTE, MODERATOR_STATISTICS_ROUTE, MODERATOR_USERS_ROUTE,
    MY_HOUSING_ROUTE,
    MY_PUBLISH_HOUSING_ROUTE,
    REQUESTS_ROUTE
} from "../../../../utils/consts/paths.js";
import {FaHouse} from "react-icons/fa6";
import {FaArtstation, FaLaptopHouse, FaUsers} from "react-icons/fa";
import s from './SideMenu.module.css'
import PropTypes from "prop-types";
import {VscRequestChanges} from "react-icons/vsc";


const MenuItem = ({route, absoluteRoute, children}) => {
    return (
        <CustomLink to={route}
                    absolutePath={absoluteRoute}>
            <li>
                {children}
            </li>
        </CustomLink>
    )
}

MenuItem.propTypes = {
    route: PropTypes.string,
    absoluteRoute: PropTypes.string,
    children: PropTypes.node
}

const SideMenu = () => {

    return (
        <div className={s.side__menu}>
            <nav>
                <ul className={s.ul__menu}>
                    <MenuItem route={REQUESTS_ROUTE}
                              absoluteRoute={`${MODERATOR_SCENE_ROUTE}/${REQUESTS_ROUTE}/*`}
                    >
                        <VscRequestChanges className={'icon'}/> Заявки
                    </MenuItem>
                    <MenuItem route={MODERATOR_USERS_ROUTE}
                              absoluteRoute={`${MODERATOR_SCENE_ROUTE}/${MODERATOR_USERS_ROUTE}`}
                    >
                        <FaUsers className={'icon'}/> Пользователи
                    </MenuItem>
                    <MenuItem route={MODERATOR_STATISTICS_ROUTE}
                              absoluteRoute={`${MODERATOR_SCENE_ROUTE}/${MODERATOR_STATISTICS_ROUTE}`}
                    >
                        <FaArtstation className={'icon'}/> Статистика
                    </MenuItem>
                </ul>
            </nav>
        </div>
    );
};

export default SideMenu;