import React from 'react';
import PropTypes from 'prop-types';
import {Outlet} from "react-router-dom";

const ChatLayout = props => {
    return (
        <div className={'layout__chat'}>
            <header className={'header__chat'}>Шапка</header>
            <aside className="aside__chat">Боковое меню</aside>
            <main className="main__chat">
                <Outlet />
            </main>
        </div>
    );
};

ChatLayout.propTypes = {
    
};

export default ChatLayout;