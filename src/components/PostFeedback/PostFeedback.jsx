import React from 'react';
import PropTypes from 'prop-types';
import {Container} from "react-bootstrap";
import {MyButton} from "../../feutures/index.js";

const PostFeedback = ({setFeedbacks, ...props}) => {
    return (
        <Container className={'container_post_feedback'}>
            <MyButton>Написать отзыв</MyButton>
        </Container>
    );
};

PostFeedback.propTypes = {
    setFeedbacks: PropTypes.func,
};

export default PostFeedback;