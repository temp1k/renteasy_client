import React from 'react';
import PropTypes from 'prop-types';
import {Container} from "react-bootstrap";
import './feedbacks.css'
import {formatJsonDateTo_ddMMyyyy, formatJsonDateTo_HHmm} from "../../utils/helpers.js";
import {StarsRating} from "../StarsRating/index.js";
import {useUser} from "../../hook/useUser.js";

const Feedback = ({feedback}) => {
    const user = feedback.user_detail
    const date = formatJsonDateTo_ddMMyyyy(feedback.date_push)
    const time = formatJsonDateTo_HHmm(feedback.date_push)
    const {currentUser} = useUser()

    return (
        <div className="container_feedback">
            <p className={'feedback__user'}>{user.username} {currentUser.id === user.id && '(Вы)'}</p>
            <p className="date_feedback">
                <span>{date}</span>{' '}
                в <span>{time}</span>
            </p>
            <StarsRating defaultRating={feedback.estimation}/>
            <div className="comment_feedback">
                <h6>Комментарий</h6>
                <p className={'comment'}>{feedback.description || 'Нет комментария'}</p>
            </div>
        </div>
    );
};

const Feedbacks = ({feedbacks, ...props}) => {
    return (
        <Container className={'main_container_feedbacks'}>
            <h4>Отзывы</h4>
            {feedbacks.length < 1 && <span>Нет отзывов</span>}
            <div className="container_feedbacks">
                {feedbacks.map(feedback =>
                    <Feedback key={feedback.id} feedback={feedback}/>
                )}
            </div>


        </Container>
    );
};

Feedbacks.propTypes = {
    feedbacks: PropTypes.array,
};

export default Feedbacks;