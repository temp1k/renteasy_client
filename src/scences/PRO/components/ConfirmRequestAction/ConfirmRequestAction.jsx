import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ConfirmAlert, MyButton, SuccessAlert} from "../../../../feutures/index.js";
import {FaCheck} from "react-icons/fa";
import {putActiveLandlordRequestAPI} from "../../../../http/api/buyRequestsAPI.js";
import {getErrorText} from "../../../../utils/helpers.js";

const ConfirmRequestAction = ({requestId, successCallback}) => {
    const active = true
    const [loading, setLoading] = useState(false)

    const confirmRequest = () => {
        setLoading(true)
        putActiveLandlordRequestAPI(requestId, {status: active})
            .then(data => {
                SuccessAlert(
                    'Успех!',
                    'Заявка успешно одобрена',
                    () => successCallback()
                )
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
            })
            .finally(() => setLoading(false))
    }

    const clickHandle = () => {
        ConfirmAlert(
            'Вы уверены, что хотите одобрить данную аренду?',
            () => confirmRequest()
        )
    }


    return (
        <>
            <MyButton
                variant={'success'}
                onClick={clickHandle}
                loading={loading}
                icon={<FaCheck />}
            >
                Одобрить</MyButton>
        </>
    );
};

ConfirmRequestAction.propTypes = {
    requestId: PropTypes.number,
    successCallback: PropTypes.func,
};

export default ConfirmRequestAction;