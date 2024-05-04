import React from 'react';
import {CONFIRM_REQUEST_STATUS} from "../../../../utils/consts/statuses.js";
import DoneRequests from "../DoneRequests/DoneRequests.jsx";

const ConfirmRequests = props => {
    return (
        <DoneRequests status={CONFIRM_REQUEST_STATUS} />
    );
};

ConfirmRequests.propTypes = {

};

export default ConfirmRequests;