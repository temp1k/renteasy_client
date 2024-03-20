import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {Link} from "react-router-dom";
import {HOME_ROUTE, PROFILE_ROUTE, RENT_SCENE_ROUTE} from "../../utils/paths.js";
import {CustomLink} from "../../feutures";


const Header = () => {
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
                            <Button>Войти</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;