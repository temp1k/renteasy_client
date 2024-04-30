import React from 'react';
import {Container} from "react-bootstrap";
import {MyLogo} from "../../../../feutures/index.js";
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <Container className={s.container_header}>
                <MyLogo className={s.logo}/>
                <div className={s.content__header}></div>
            </Container>
        </header>
    );
};

export default Header;