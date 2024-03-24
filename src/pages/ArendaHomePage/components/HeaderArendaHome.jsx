import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {HOME_ROUTE, SUBSCRIBE_PRO_ROUTE} from "../../../utils/consts/paths.js";
import {Link} from "react-router-dom";
import {MyLogo} from "../../../feutures/index.js";

const HeaderArendaHome = () => {
    return (
            <Navbar className="bg-body-tertiary header">
                <Container>
                    <MyLogo />
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <div className={'bold-text'}>
                            Готовы стать RENTEASY PRO? <Link to={SUBSCRIBE_PRO_ROUTE} className={'my-btn'}>Стать PRO</Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
};

export default HeaderArendaHome;