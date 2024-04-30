import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Container, Table} from "react-bootstrap";
import {getRequestsAPI} from "../../api/requestsAPI.js";
import {AWAIT_REQUEST_STATUS} from "../../../../utils/consts/statuses.js";
import {
    differenceDatesInDays,
    formatJsonDateTo_ddMMyyyy,
    formatJsonDateTo_ddMMyyyy_HHmm,
    formatJsonDateToJsDate,
    getErrorText
} from "../../../../utils/helpers.js";
import {CenterLoading, CustomLinkButton, MyButton, MyTable} from "../../../../feutures/index.js";
import {REQUESTS_ROUTE} from "../../../../utils/consts/paths.js";
import {FaEye} from "react-icons/fa";
import {TfiReload} from "react-icons/tfi";
import {MyPagination} from "../../../../components/index.js";

import '../requests.css'
import {MyContainer} from "../../../../feutures/MyContainer/index.js";

const TrPublishRequest = ({request, offset = 0, index}) => {
    let housing = request.housing_d
    let owner = housing.owner
    const classes = {
        danger: 'danger',
        normal: 'norm',
        warning: 'warn',
    }
    let className = classes.normal;

    const differenceDates = differenceDatesInDays(new Date(request.date_publish), new Date())

    if (differenceDates < 3) className = className.normal;
    else if (differenceDates < 5) className = classes.warning;
    else className = classes.danger

    return (
        <tr key={request.id} className={`tr-request`}>
            <td className={`td-${className}`}>{index + 1 + offset}</td>
            <td>{housing.district.name}({housing.district.code_name})</td>
            <td>{request.housing_d.name}</td>
            <td>{owner.username}</td>
            <td>{formatJsonDateTo_ddMMyyyy(request.date_publish)}</td>
            <td>{formatJsonDateTo_ddMMyyyy_HHmm(housing.date_update)}</td>
            <td>
                <CustomLinkButton to={`../${request.id}`}><FaEye/></CustomLinkButton>
            </td>
        </tr>
    );
};

TrPublishRequest.propTypes = {
    request: PropTypes.object,
    offset: PropTypes.number,
    index: PropTypes.number
}


const PublishRequests = props => {
    const [requests, setRequests] = useState([])
    const limit = 5;
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const updateRequests = () => {
        setRequests([])
        getRequestsAPI({limit: limit, offset: offset, status: AWAIT_REQUEST_STATUS})
            .then(data => {
                setRequests(data.results)
                setCount(data.count)
            })
            .catch(err => {
                const errorText = getErrorText(err)
                setError(errorText)
                console.error(err)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        updateRequests()
    }, [offset]);

    return (
        <MyContainer>
            <div className={'legend__table'}>
                <span className={'danger_cr'}>- срочно</span>
                <span className={'warn_cr'} >- давно</span>
                <span className={'normal_cr'}>- недавно</span>
            </div>
            <MyTable bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Округ</th>
                    <th>Место</th>
                    <th>Хозяин</th>
                    <th>Дата публикации</th>
                    <th>Дата изменения</th>
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
                {requests.map((request, index) =>
                    <TrPublishRequest key={request.id} request={request} offset={offset} index={index}/>
                )}
                </tbody>
            </MyTable>
            <MyPagination count={count} setOffset={setOffset} itemsPerPage={limit}/>

        </MyContainer>
    );
};

PublishRequests.propTypes = {};

export default PublishRequests;