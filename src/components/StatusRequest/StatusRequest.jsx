import React from 'react';
import PropTypes from 'prop-types';
import s from './StatusRequest.module.css'
import {CANCEL_REQUEST_STATUS, CONFIRM_REQUEST_STATUS} from "../../utils/consts/statuses.js";

const StatusRequest = ({status}) => {
    let colorClass = s.await_color

    switch (status.name) {
        case CANCEL_REQUEST_STATUS:
            colorClass = s.cancel_color
            break;
        case CONFIRM_REQUEST_STATUS:
            colorClass = s.confirm_color
    }

    return (
        <div className={s.status__container+' '+colorClass}>
            <span>Статус:</span>
            <p>{status.name}</p>
        </div>
    );
};

StatusRequest.propTypes = {
    status: PropTypes.object,
};

export default StatusRequest;