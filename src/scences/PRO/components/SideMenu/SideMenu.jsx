import { FaHouse } from "react-icons/fa6";
import {FaLaptopHouse} from "react-icons/fa";
import './css/sidemenu.css'
import {CustomLink} from "../../../../feutures/index.js";
import {
    HOME_ROUTE,
    MY_HOUSING_ROUTE,
    MY_PUBLISH_HOUSING_ROUTE,
    MY_REQUESTS_ROUTE, NEWS_ROUTE, PRO_SCENE_ROUTE
} from "../../../../utils/consts/paths.js";
import {MdRequestQuote} from "react-icons/md";
import {GiNewspaper} from "react-icons/gi";

const SideMenu = () => {
    return (
        <aside className={'sideMenu'}>
            <ul>
                <CustomLink
                    to={MY_HOUSING_ROUTE}
                    prePath={PRO_SCENE_ROUTE}
                >
                    <li><FaHouse className={'icon'}/>Ваши места</li>
                </CustomLink>
                <CustomLink
                    to={MY_PUBLISH_HOUSING_ROUTE}
                    prePath={PRO_SCENE_ROUTE}
                >
                    <li><FaLaptopHouse className={'icon'}/> Опубликованные места</li>
                </CustomLink>
                <CustomLink
                    to={MY_REQUESTS_ROUTE}
                    prePath={PRO_SCENE_ROUTE}
                >
                    <li><MdRequestQuote className={'icon'}/> Заявки на аренду</li>
                </CustomLink>
                <CustomLink
                    to={NEWS_ROUTE}
                    prePath={PRO_SCENE_ROUTE}
                >
                    <li><GiNewspaper className={'icon'}/> Новости</li>
                </CustomLink>
            </ul>
        </aside>
    );
};

export default SideMenu;