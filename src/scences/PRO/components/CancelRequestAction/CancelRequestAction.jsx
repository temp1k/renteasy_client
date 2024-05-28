import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {MyButton, SuccessAlert, Textarea} from "../../../../feutures/index.js";
import {ImCross} from "react-icons/im";
import {useUser} from "../../../../hook/useUser.js";
import useForm from "../../../../hook/useForm.js";
import {getErrorText} from "../../../../utils/helpers.js";
import {Modal} from "react-bootstrap";
import {putActiveLandlordRequestAPI} from "../../../../http/api/buyRequestsAPI.js";


const status = false
const CancelRequestAction = ({requestId, successCallback}) => {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const clickHandle = () => {
        setShowModal(true)
    }

    return (
        <>
            <MyButton
                variant={'danger'}
                icon={<ImCross />}
                onClick={clickHandle}
                loading={loading}
            >
                Отклонить
            </MyButton>
            <MessageModal successCallback={successCallback} requestId={requestId} show={showModal} onHide={handleCloseModal} />
        </>
    );
};

CancelRequestAction.propTypes = {
    requestId: PropTypes.number,
};

export default CancelRequestAction;

const MessageModal = ({requestId, successCallback, ...props}) => {
    const {currentUser} = useUser()
    const [loading, setLoading] = useState(false)
    const message = {
        title: 'Вам отказано в доступе',
        text: '',
        reason: 'False',
        request: requestId,
        sender: currentUser.id,
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
        resetForm,
    } = useForm(message, () => {
    })

    const cancelRequest = () => {
        setLoading(true)
        putActiveLandlordRequestAPI(requestId, {status: status})
            .then(data => {
                SuccessAlert(
                    'Заявка отклонена!',
                    'Заявка успешно отклонена',
                    () => {
                        successCallback()
                        handleClose()
                    }
                )
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
            })
            .finally(() => setLoading(false))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            cancelRequest()
        }
    }

    const handleClose = () => {
        resetForm()
        props.onHide()
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
                    <h6>Укажите причину отказа</h6>
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
                    <MyButton type={'submit'} loading={loading}>Сохранить</MyButton>
                    <MyButton type={'button'} onClick={handleClose} variant={'danger'}>Закрыть</MyButton>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
MessageModal.propTypes = {
    requestId: PropTypes.number.isRequired,
    successCallback: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
}