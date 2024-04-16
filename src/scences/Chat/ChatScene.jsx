import React from 'react';
import PropTypes from 'prop-types';
import {Route, Routes} from "react-router-dom";
import {ChatLayout} from "../../components/layouts/index.js";
import {ChatPage, HomeChatPage} from "./pages/index.js";
import {NotFoundPage} from "../../pages/index.js";

const ChatScene = props => {
    return (
        <Routes>
            <Route path={'/*'} element={<ChatLayout />}>
                <Route index element={<HomeChatPage />} />
                <Route path={':id'} element={<ChatPage />} />
                <Route path={'*'} element={<NotFoundPage text={'Такого чата не существует'} />} />
            </Route>
        </Routes>
    );
};

ChatScene.propTypes = {

};

export default ChatScene;