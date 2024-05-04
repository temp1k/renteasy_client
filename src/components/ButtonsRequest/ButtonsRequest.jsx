import React, {useState} from 'react';
import PropTypes from 'prop-types';
import s from './ButtonsReques.module.css'
import {CANCEL_REQUEST_STATUS, CONFIRM_REQUEST_STATUS} from "../../utils/consts/statuses.js";
import {ConfirmAlert, MyButton, SuccessAlert, Textarea} from "../../feutures/index.js";
import {changeStatusPublihsHousingAPI} from "../../http/api/publishHousingAPI.js";
import {getErrorText} from "../../utils/helpers.js";
import {Modal} from "react-bootstrap";
import {useUser} from "../../hook/useUser.js";
import useForm from "../../hook/useForm.js";
import {Navigate, useNavigate} from "react-router-dom";
import {AWAIT_REQUESTS_ROUTE, REQUESTS_ROUTE} from "../../utils/consts/paths.js";

const MessageModal = ({publishHousing, setPublishHousing, ...props}) => {
    const {currentUser} = useUser()
    const navigate = useNavigate()
    const message = {
        title: 'Вам отказано в доступе',
        text: '',
        reason: 'False',
        publish_housing: publishHousing.id,
        sender: currentUser.id,
        recipient: publishHousing.housing_d.owner_d.id,
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('text' in fieldValues) {
            temp.text = fieldValues.text ? "" : "Напишите причину"
            temp.text = !temp.text && fieldValues.text.length > 500
                ? "Причина должна быть меньш 500 символов"
                : temp.text
        }

        setErrors({...temp})

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors, setErrors,
        handleInputChange,
    } = useForm(message, () => {
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            console.log(values)
            changeStatusPublihsHousingAPI(publishHousing.id, CANCEL_REQUEST_STATUS, values)
                .then(data => {
                    setPublishHousing({...publishHousing, status_d: data.status_d})
                    SuccessAlert('Завка отклонена', `${data.housing_d.name} успешно отклонено`,
                        () => {
                            navigate('../' + REQUESTS_ROUTE, {replace: true})
                        })
                })
                .catch(err => {
                    const errorText = getErrorText(err)
                    console.error(err)
                    alert(errorText)
                })
                .finally(() => props.onHide())
        }
        console.log(errors)
    }

    return (
        <Modal
            {...props}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Отклонение запроса
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <h6>Напишите причины отказа</h6>
                    <Textarea
                        name='text'
                        autoFocus={true}
                        rows={5}
                        value={values.text}
                        error={errors.text}
                        onChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <MyButton type={'submit'}>Сохранить</MyButton>
                    <MyButton type={'button'} onClick={props.onHide} variant={'danger'}>Закрыть</MyButton>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
MessageModal.propTypes = {
    publishHousing: PropTypes.object.isRequired,
    setPublishHousing: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
}


const ButtonsRequest = ({publishHousing, nodeCancel = 'Отклонить', nodeConfirm = 'Одобрить', setPublishHousing}) => {
    const navigate = useNavigate()
    let status = publishHousing.status_d;
    const [modalShow, setModalShow] = useState(false)

    const cancelStatusClick = () => {
        setModalShow(true)
    }

    const confirmStatusClick = () => {
        ConfirmAlert(
            'Вы уверены, что хотите одобрить данную заявку?',
            () => {
                changeStatusPublihsHousingAPI(publishHousing.id, CONFIRM_REQUEST_STATUS)
                    .then(data => {
                        setPublishHousing(data)
                        SuccessAlert('Завка одобрена', `${data.housing_d.name} успешно одобрено`, () => {
                            navigate('../' + REQUESTS_ROUTE, {replace: true})
                        })
                    })
                    .catch(err => {
                        const errorText = getErrorText(err)
                        console.error(err)
                        alert(errorText)
                    })
            })
    }

    return (
        <div className={s.container}>
            {status.name !== CANCEL_REQUEST_STATUS &&
                <MyButton
                    onClick={cancelStatusClick}
                    variant={'danger'}
                >
                    {nodeCancel}
                </MyButton>
            }
            {status.name !== CONFIRM_REQUEST_STATUS &&
                <MyButton
                    onClick={confirmStatusClick}
                    variant={'success'}
                >
                    {nodeConfirm}
                </MyButton>
            }
            <MessageModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                publishHousing={publishHousing}
                setPublishHousing={setPublishHousing}
            />
        </div>
    );
};

ButtonsRequest.propTypes = {
    publishHousing: PropTypes.object,
    nodeCancel: PropTypes.node,
    nodeConfirm: PropTypes.node,
    setPublishHousing: PropTypes.func,
};

export default ButtonsRequest;