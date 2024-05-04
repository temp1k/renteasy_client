import React from 'react';
import PropTypes, {object} from 'prop-types';
import {ConfirmAlert, MyButton, SuccessAlert} from "../../feutures/index.js";
import {blockUserAPI} from "../../http/api/usersAPI.js";
import {getErrorText} from "../../utils/helpers.js";

const ButtonBlockUser = ({user, setUser, nodeBlock = 'Заблокировать', nodeUnlock = 'Разблокировать'}) => {
    let active = user.is_active
    const clickButton = () => {
        ConfirmAlert(
            `Вы уверены, что хотите ${active ? 'заблокировать' : 'разблокировать'} пользователя ${user.username}`,
            () => {
                blockUserAPI(user.id, !active)
                    .then(data => {
                        setUser({...user, is_active: data.is_active})
                        SuccessAlert(`Пользователь успешно ${data.is_active ? 'разблокирова' : 'заблокирован'}`)
                    })
                    .catch(err => {
                        console.error(err)
                        alert(getErrorText(err))
                    })
            }
        )
    }

    return (
        <MyButton onClick={clickButton} variant={active ? 'danger' : 'success'}>
            {active ? nodeBlock : nodeUnlock}
        </MyButton>
    );
};

ButtonBlockUser.propTypes = {
    user: PropTypes.object,
    nodeBlock: PropTypes.node,
    nodeUnlock: PropTypes.node,
};

export default ButtonBlockUser;