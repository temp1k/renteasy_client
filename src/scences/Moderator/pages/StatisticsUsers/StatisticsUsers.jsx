import React from 'react';
import PropTypes from 'prop-types';
import {DistrictStatistics} from "../../components/DistrictStatisctics/index.js";
import {Container} from "react-bootstrap";

const StatisticsUsers = props => {
    return (
        <Container>
            <h4>Статистика арендодателей</h4>
            <DistrictStatistics />
        </Container>
    );
};

StatisticsUsers.propTypes = {

};

export default StatisticsUsers;