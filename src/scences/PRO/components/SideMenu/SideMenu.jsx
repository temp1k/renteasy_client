import React from 'react';
import { FaHouse } from "react-icons/fa6";
import {FaLaptopHouse} from "react-icons/fa";
import './css/sidemenu.css'
import {CustomLink} from "../../../../feutures/index.js";
import {HOME_ROUTE, MY_HOUSING_ROUTE, MY_PUBLISH_HOUSING_ROUTE} from "../../../../utils/consts/paths.js";

const SideMenu = () => {
    return (
        <aside>
            <ul>
                <CustomLink to={MY_HOUSING_ROUTE}><li><FaHouse className={'icon'}/>Ваши места</li></CustomLink>
                <CustomLink to={MY_PUBLISH_HOUSING_ROUTE}><li><FaLaptopHouse className={'icon'}/> Опубликованные места</li></CustomLink>
                <CustomLink to={HOME_ROUTE}><li><i className="fas fa-newspaper"></i> Новости</li></CustomLink>
            </ul>
        </aside>
    );
};

export default SideMenu;