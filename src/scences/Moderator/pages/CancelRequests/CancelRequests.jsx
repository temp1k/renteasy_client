import React from 'react';
import PropTypes from 'prop-types';
import DoneRequests from "../DoneRequests/DoneRequests.jsx";
import {CANCEL_REQUEST_STATUS} from "../../../../utils/consts/statuses.js";

const CancelRequests = props => {
    return (
        <DoneRequests status={CANCEL_REQUEST_STATUS} />
    );
};

CancelRequests.propTypes = {

};

export default CancelRequests;