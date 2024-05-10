import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";

const ProfileRequestPage = props => {
    const {id} = useParams()
    return (
        <div>
            Заявка {id}
        </div>
    );
};

ProfileRequestPage.propTypes = {

};

export default ProfileRequestPage;