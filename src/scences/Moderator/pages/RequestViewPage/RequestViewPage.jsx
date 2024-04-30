import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import useDataAPI from "../../../../hook/useDataAPI.js";
import {getAllUsersAPI} from "../../api/usersAPI.js";
import {Container} from "react-bootstrap";
import {CenterLoading, CustomLinkButton, MyButton, MyTable} from "../../../../feutures/index.js";
import {TfiReload} from "react-icons/tfi";
import {formatJsonDateTo_ddMMyyyy, formatJsonDateTo_ddMMyyyy_HHmm} from "../../../../utils/helpers.js";
import {FaEye} from "react-icons/fa";

const TrUser = ({user, offset = 0, index}) => {
    return (
        <tr key={user.id} className={`tr-request`}>
            <td>{index + 1 + offset}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.first_name + ' ' + user.last_name}</td>
            <td>{
                user.groups.map(role =>
                    <span key={role}>{role+' '}</span>
                )
            }</td>
            <td>{formatJsonDateTo_ddMMyyyy(user.date_joined)}</td>
            <td></td>
            <td>
                <CustomLinkButton to={`../${request.id}`}><FaEye/></CustomLinkButton>
            </td>
        </tr>
    );
}

TrUser.propTypes = {
    user: PropTypes.object,
    offset: PropTypes.number,
    index: PropTypes.number,
}


const RequestViewPage = props => {
    const {id} = useParams()

    const {
        data, updateData,
        error,
        loading,
        count,
        offset, setOffset
    } = useDataAPI({limit: 10, requestAPI: getAllUsersAPI, params: {}})

    return (
        <Container>
            <MyTable bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Логин</th>
                    <th>Почта</th>
                    <th>Имя</th>
                    <th>Роль</th>
                    <th>Дата регистрации</th>
                    <th>Активность пользователя</th>
                    <th>Подтвержденный аккаунт</th>
                    <th></th>
                    <th>
                        <MyButton
                            onClick={() => {
                                setLoading(true)
                                setRequests([])
                                updateRequests()
                            }}
                            variant={'secondary'}
                        >
                            <TfiReload/>
                        </MyButton>
                    </th>
                </tr>
                {error}
                </thead>
                <tbody>
                {loading &&
                    <tr>
                        <td colSpan={6}><CenterLoading/></td>
                    </tr>
                }
                {data.map((user, index) =>
                    <TrUser key={user.id} user={user} offset={offset} index={index}/>
                )}
                </tbody>
            </MyTable>
        </Container>
    );
};

RequestViewPage.propTypes = {

};

export default RequestViewPage;