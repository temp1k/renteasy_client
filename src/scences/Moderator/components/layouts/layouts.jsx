import {Outlet} from "react-router-dom";
import {Header} from "../Header/index.js";
import s from './Layouts.module.css'
import {AsideMenu} from "../SideMenu/index.js";
import {CustomLink} from "../../../../feutures/index.js";
import {
    AWAIT_REQUESTS_ROUTE,
    CANCEL_REQUESTS_ROUTE,
    CONFIRM_REQUESTS_ROUTE,
    MODERATOR_SCENE_ROUTE, MODERATOR_STATISTICS_ROUTE, MODERATOR_USERS_ROUTE, REQUESTS_ROUTE, USERS_LIST_ROUTE
} from "../../../../utils/consts/paths.js";

const ModeratorLayout = props => {
    return (
        <div className={s.layout__moderator}>
            <Header/>
            <aside className={s.aside__menu}>
                <AsideMenu/>
            </aside>
            <main className={s.main}>
                <Outlet/>
            </main>
        </div>
    );
}

const RequestsLayout = props => {
    return (
        <div className={s.layout__requests}>
            <nav className={s.nav__requests}>
                <CustomLink
                    to={AWAIT_REQUESTS_ROUTE}
                    absolutePath={`${MODERATOR_SCENE_ROUTE}/${REQUESTS_ROUTE}/${AWAIT_REQUESTS_ROUTE}`}
                >
                    Заявки
                </CustomLink>
                |
                <CustomLink
                    to={CANCEL_REQUESTS_ROUTE}
                    absolutePath={`${MODERATOR_SCENE_ROUTE}/${REQUESTS_ROUTE}/${CANCEL_REQUESTS_ROUTE}`}
                >
                    Отклоненные заявки
                </CustomLink>
                |
                <CustomLink
                    to={CONFIRM_REQUESTS_ROUTE}
                    absolutePath={`${MODERATOR_SCENE_ROUTE}/${REQUESTS_ROUTE}/${CONFIRM_REQUESTS_ROUTE}`}

                >
                    Подтвержденные заявки
                </CustomLink>
            </nav>
            <Outlet/>
        </div>
    );
}

const UsersLayout = props => {
    return (
        <div>
            <nav className={s.nav__requests}>
                <CustomLink
                    to={''}
                    absolutePath={`${MODERATOR_SCENE_ROUTE}/${MODERATOR_USERS_ROUTE}/${USERS_LIST_ROUTE}`}
                >
                    Список пользователей
                </CustomLink>
                |
                <CustomLink
                    to={MODERATOR_STATISTICS_ROUTE}
                    absolutePath={`${MODERATOR_SCENE_ROUTE}/${MODERATOR_USERS_ROUTE}/${MODERATOR_STATISTICS_ROUTE}`}
                >
                    Статистика
                </CustomLink>
            </nav>
            <Outlet/>
        </div>
    );
}

export {ModeratorLayout, RequestsLayout, UsersLayout}


