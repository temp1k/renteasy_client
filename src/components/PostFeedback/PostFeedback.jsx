import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import {CenterLoading, MyButton} from "../../feutures/index.js";
import {StarsRating} from "../StarsRating/index.js";
import CustomTextarea from "../../feutures/CustomTextarea/CustomTextarea.jsx";
import './post_feedback.css'
import {postFeedbackAPI} from "../../http/api/feedbackAPI.js";
import {useUser} from "../../hook/useUser.js";


const FeedbackModal = ({callback, publishHousing, onHide, ...props}) => {
    const housing = publishHousing.housing_d;
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const {currentUser} = useUser()
    const [loading, setLoading] = useState(false)

    const handleRatingChange = (selectedRating) => {
        setRating(selectedRating);
    };

    const closeModal = () => {
        setRating(0)
        setReviewText('')
        onHide()
    }

    const validate = () => {
        let errors = [];

        if (rating <= 0) errors.push('Пожалуйста. Оцените данный продукт по пяти бальной системе')

        errors.forEach(err =>  {
            if (err.trim() !== "") {
                alert(err);
            }
        });

        return Object.values(errors).every(x => x === "")
    }

    const handleSubmitFeedback = async (e) => {
        e.preventDefault()

        if (validate()) {
            setLoading(true)
            const feedback = {
                estimation: rating,
                description: reviewText,
                product: publishHousing.id,
                user: currentUser.id,
            }

            await callback(feedback)
                .then(() => {
                    closeModal()
                })
                .catch(err => {
                    err.response?.data?.non_field_errors && alert('Вы уже писали отзыв к данному продукту.')
                })
            setLoading(false)

        }
    }

    return (
        <Modal
            {...props}
            show={props.show}
            onHide={onHide}
            size="lg"
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Напишите отзыв
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmitFeedback}>
                <Modal.Body>
                    <p className="housing_title">{housing.name} | {housing.address}</p>
                    {loading &&
                        <div>
                            <CenterLoading />
                        </div>
                    }
                    <StarsRating onChangeRating={handleRatingChange}/>
                    <CustomTextarea label={'Поделитесь впечатлением:'} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                </Modal.Body>
                <Modal.Footer className={'footer_post_feedback'}>
                    <MyButton type={'submit'}>Отправить</MyButton>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button variant={'danger'} onClick={closeModal}>Отмена</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

const   PostFeedback = ({addFeedback, publishHousing, ...props}) => {
    const [modalShow, setModalShow] = useState(false);

    const postFeedback = async (feedback) => {
        console.log(feedback)

        await postFeedbackAPI(feedback)
            .then(data => {
                console.log(data)
                addFeedback(data)
            })
            .catch(err => {
                throw err
            })
    }

    return (
        <>
            <MyButton
                onClick={() => setModalShow(true)}
                {...props}
                className={props.className}
            >
                Написать отзыв
            </MyButton>

            <FeedbackModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                callback={postFeedback}
                publishHousing={publishHousing}
            />
        </>
    );
};

PostFeedback.propTypes = {
    addFeedback: PropTypes.func,
    className: PropTypes.string,
    publishHousing: PropTypes.object,
};

export default PostFeedback;