import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";

const RequestPage = props => {
    const {id} = useParams()
    return (
        <div>
            Запрос {id}
        </div>
    );
};

RequestPage.propTypes = {
    
};

export default RequestPage;