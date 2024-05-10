import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import useForm from "../../../hook/useForm.js";
import {CenterLoading, Input, MyButton} from "../../../feutures/index.js";
import {checkCodeAPI, sendCodeEmailAPI} from "../../../http/api/authAPI.js";
import {getErrorText} from "../../../utils/helpers.js";

let initialValues = {
    code: ''
}

const CheckCodeModal = ({active, setActive, email, success_callback, canceled_callback, ...props}) => {

    const [loadingSend, setLoadingSend] = useState(true)
    const [loadingCheck, setLoadingCheck] = useState(false)
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('code' in fieldValues) {
            temp.code = fieldValues.code.length === 6 ? "" : "Код должен состоять из 6 цифр"
        }

        if (fieldValues === values) setErrors({
            ...temp
        });

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors, setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialValues, validate)

    const sendCode = () => {
        sendCodeEmailAPI(email)
            .then(data => {
                setLoadingSend(false)
            })
            .catch(err => {
                console.error(err)
                alert(`ОШИБКА ОТПРАВКИ КОДА\n${getErrorText(err)}`)
                hideModal()
            })
    }

    const checkCode = () => {
        setLoadingCheck(true)
        checkCodeAPI(values)
            .then(data => {
                success_callback()
                hideModal()
            })
            .catch(err => {
                console.error(err)
                alert('Неверный код доступа\n' + getErrorText(err))
            })
            .finally(() => setLoadingCheck(false))
    }

    useEffect(() => {
        if (active) {
            sendCode()
        }
    }, [active]);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            checkCode()
        }
    }

    const hideModal = () => {
        setLoadingSend(true)
        setLoadingCheck(false)
        setActive(false)
        resetForm()
        canceled_callback()
    }

    return (
        <Modal
            show={active}
            onHide={hideModal}
            backdrop="static"
            keyboard={false}
        >
            {loadingSend ?
                <div>
                    <Modal.Header>Отправка кода...</Modal.Header>
                    <Modal.Body>
                        <CenterLoading/>
                    </Modal.Body>
                </div>
                :
                <div>
                    <Modal.Header closeButton>Введите код</Modal.Header>
                    <Modal.Body>
                        <p>На вашу почту <span>{email}</span> выслан код доступа</p>
                        <form onSubmit={handleSubmit}>
                            <Input name={'code'} placeholder={'Код'}
                                   label={'Введите код:'}
                                   value={values.code}
                                   onChange={handleInputChange}
                                   pattern="\d{6}" maxlength="6"
                                   title="Пожалуйста, введите ровно 6 цифры"
                            />
                            <MyButton
                                type={'submit'}
                                disabled={values.code.length < 6}
                                loading={loadingCheck}
                            >Отправить</MyButton>
                        </form>
                    </Modal.Body>
                </div>
            }
        </Modal>
    );
};

CheckCodeModal.propTypes = {
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
    email: PropTypes.string,
    success_callback: PropTypes.func.isRequired,
    canceled_callback: PropTypes.func
};

export default CheckCodeModal;