import React, {useState} from 'react';
import {ConfirmAlert, Input, MyButton, SuccessAlert, Textarea} from "../../../../feutures/index.js";
import {LuDatabaseBackup} from "react-icons/lu";
import {useUser} from "../../../../hook/useUser.js";
import {useNavigate} from "react-router-dom";
import useForm from "../../../../hook/useForm.js";
import {changeStatusPublihsHousingAPI} from "../../../../http/api/publishHousingAPI.js";
import {CANCEL_REQUEST_STATUS} from "../../../../utils/consts/statuses.js";
import {REQUESTS_ROUTE} from "../../../../utils/consts/paths.js";
import {getErrorText} from "../../../../utils/helpers.js";
import {Modal} from "react-bootstrap";
import {restoreAPI} from "../../http/backupAPI.js";

const ButtonRestore = () => {
    const [loading, setLoading] = useState(false)

    const restoreDb = () => {
        setLoading(true)
        restoreAPI()
            .then(data => {
                SuccessAlert(
                    'Восстановление выполнено!',
                    'Восстановление базы данных успешно выполнено')
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
            })
            .finally(() => {setLoading(false)})
    }

    const handleClick = () => {
        ConfirmAlert(
            'Вы уверены, что хотите восстановить базу данных?',
            () => restoreDb(),
        )
    }

    return (
        <>
            <MyButton
                onClick={handleClick}
                loading={loading}
            >
                <LuDatabaseBackup />Восстановить базу данных
            </MyButton>
        </>
    );
};

export default ButtonRestore;