import {Button, Container, Nav, Navbar} from "react-bootstrap"

import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, RENT_SCENE_ROUTE} from "../../utils/paths.js";
import {CustomLink} from "../../feutures";
import {useUser} from "../../hook/useUser.js";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../store/userSlice.js";


const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser} = useUser()
    console.log(currentUser)

    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link to={HOME_ROUTE} className={'navbar-brand'}>RENTEASY</Link>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <CustomLink to={RENT_SCENE_ROUTE} className={'nav-link'}>Сдать жилье</CustomLink>
                            <CustomLink to={PROFILE_ROUTE} className={'nav-link'}>
                                Профиль
                            </CustomLink>
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
        </header>
    );
};

export default Header;