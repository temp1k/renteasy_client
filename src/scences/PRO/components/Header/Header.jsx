import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {MyLogo} from "../../../../feutures/index.js";

const Header = () => {
    return (
        <Navbar className="bg-body-tertiary my__header">
            <Container>
                <Navbar.Brand>
                    <span>PRO</span>{' '}
                    <MyLogo />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;