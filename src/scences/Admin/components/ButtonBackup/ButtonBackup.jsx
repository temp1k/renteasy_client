import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ConfirmAlert, Input, MyButton, SuccessAlert} from "../../../../feutures/index.js";
import {LuDatabaseBackup} from "react-icons/lu";
import {MdBackupTable} from "react-icons/md";
import {useUser} from "../../../../hook/useUser.js";
import useForm from "../../../../hook/useForm.js";
import {Modal} from "react-bootstrap";
import {backupAPI} from "../../http/backupAPI.js";
import {getErrorText} from "../../../../utils/helpers.js";

const ButtonBackup = props => {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <>
            <MyButton
                onClick={handleClick}
            ><MdBackupTable />Создать резервную копию</MyButton>
            <ModalBackup show={show} onHide={() => setShow(false)} />
        </>
    );
};

const ModalBackup = (props) => {
    const {currentUser} = useUser()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? "" : "Данное поле не может быть пустым"
            temp.name = !temp.name && fieldValues.name.length > 50
                ? "Название должно быть меньше 50 символов"
                : temp.name
        }

        setErrors({...temp})

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors, setErrors,
        handleInputChange,
        resetForm
    } = useForm({name: ''}, validate)

    const backup = () => {
        backupAPI(values)
            .then(data => {
                SuccessAlert(
                    'Выполнено',
                    'Резервное копирование успешно выполнено',
                    () => {hideModal()}
                )
            })
            .catch(err => {
                console.log(err)
                alert(getErrorText(err))
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            ConfirmAlert(
                'Вы уверены, что хотите создать резервную копию базы данных?',
                () => backup()
            )
        }
    }

    const hideModal = () => {
        resetForm()
        props.onHide()
    }

    return (
        <Modal
            {...props}
            onHide={hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Создание резервной копии
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Input
                        name='name'
                        label={'Название backup:'}
                        placeholder={'Введите название файла...'}
                        value={values.name} onChange={handleInputChange}
                        error={errors.name}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <MyButton type={'submit'}>Сохранить</MyButton>
                    <MyButton type={'button'} onClick={hideModal} variant={'danger'}>Закрыть</MyButton>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ButtonBackup;