import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";

const Footer = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container className={"text-center d-block"}>
                This is footer
            </Container>
        </Navbar>
    );
};

export default Footer;