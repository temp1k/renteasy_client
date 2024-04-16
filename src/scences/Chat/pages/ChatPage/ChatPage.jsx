import React from 'react';
import PropTypes from 'prop-types';
import {useLocation, useParams} from "react-router-dom";

const ChatPage = props => {
    const {id} = useParams()

    return (
        <div>
            Чат с id {id}
        </div>
    );
};

ChatPage.propTypes = {
    
};

export default ChatPage;