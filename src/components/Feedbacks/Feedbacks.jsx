import React from 'react';
import PropTypes from 'prop-types';
import {Container} from "react-bootstrap";

const Feedbacks = ({feedbacks, ...props}) => {
    return (
        <Container className={'container_feedbacks'}>
            <h4>Отзывы</h4>
        </Container>
    );
};

Feedbacks.propTypes = {
    feedbacks: PropTypes.array,
};

export default Feedbacks;