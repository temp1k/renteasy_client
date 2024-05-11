import {Button, Container, Nav, Navbar} from "react-bootstrap"

import {Link, useNavigate} from "react-router-dom";
import {
    ADMIN_SCENE_ROUTE,
    LOGIN_ROUTE,
    MODERATOR_SCENE_ROUTE,
    PRO_SCENE_ROUTE,
    PROFILE_ROUTE,
    RENT_SCENE_ROUTE
} from "../../utils/consts/paths.js";
import {CustomLink, MyLogo} from "../../feutures";
import {useUser} from "../../hook/useUser.js";
import {ADMIN_ROLE, LANDLORD_ROLE, MODERATOR_ROLE, USER_ROLE} from "../../utils/consts/roles.js";
import {LinkToAdminPanel} from "../LinkToAdminPanel/index.js";


const Header = () => {
    const navigate = useNavigate()
    const {currentUser, logoutFn} = useUser()

    const logout = () => {
        logoutFn()
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" sticky={'top'}>
            <Container>
                <MyLogo/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {currentUser.roles.includes(LANDLORD_ROLE) &&
                            <CustomLink to={PRO_SCENE_ROUTE} className={'nav-link'}>PRO панель</CustomLink>
                        }
                        {currentUser.roles.includes(USER_ROLE) &&
                            <CustomLink to={RENT_SCENE_ROUTE} className={'nav-link'}>Сдать жилье</CustomLink>
                        }
                        {currentUser.roles.includes(ADMIN_ROLE) &&
                            <CustomLink to={ADMIN_SCENE_ROUTE} className={'nav-link'}>Администрирование</CustomLink>
                        }
                        {currentUser.roles.includes(MODERATOR_ROLE) &&
                            <CustomLink to={MODERATOR_SCENE_ROUTE} className={'nav-link'}>Модерация</CustomLink>
                        }
                        {currentUser.isAuth && <CustomLink to={PROFILE_ROUTE} className={'nav-link'}>
                            Профиль
                        </CustomLink>
                        }
                        {currentUser.isAuth ? (
                            <Button variant={'outline-primary'} onClick={() => logout()}>Выйти</Button>
                        ) : (
                            <Link to={LOGIN_ROUTE} className={'btn btn-primary'}>Войти</Link>
                        )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;