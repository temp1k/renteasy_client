import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getMyHousingsAPI} from "../MyHousings/api/myHousingsAPI.js";
import {RentRequestsList} from "../../components/index.js";

const RequestsPage = props => {


    return (
        <div>
            <h4>Заявки на аренду от пользователей</h4>

            <RentRequestsList />
        </div>
    );
};

RequestsPage.propTypes = {
    
};

export default RequestsPage;