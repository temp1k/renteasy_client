import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getRequestsAPI} from "../../api/requestsAPI.js";
import {formatJsonDateTo_ddMMyyyy, formatJsonDateTo_ddMMyyyy_HHmm, getErrorText} from "../../../../utils/helpers.js";
import {MyContainer} from "../../../../feutures/MyContainer/index.js";
import {CenterLoading, CustomLinkButton, MyButton, MyTable} from "../../../../feutures/index.js";
import {TfiReload} from "react-icons/tfi";
import {MyPagination} from "../../../../components/index.js";
import {FaEye} from "react-icons/fa";

const TrConfirmRequest = ({request, offset = 0, index}) => {
    let housing = request.housing_d
    let owner = housing.owner

    return (
        <tr key={request.id} className={`tr-request`}>
            <td>{index + 1 + offset}</td>
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
TrConfirmRequest.propTypes = {
    request: PropTypes.object,
    offset: PropTypes.number,
    index: PropTypes.number
}

const DoneRequests = ({status}) => {
    const [requests, setRequests] = useState([])
    const limit = 5;
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const updateRequests = () => {
        setRequests([])
        setError('')
        getRequestsAPI({limit: limit, offset: offset, status: status})
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
                </thead>
                <tbody>
                {error &&
                    <tr>
                        <td colSpan={10}>{error}</td>
                    </tr>
                }
                {loading &&
                    <tr>
                        <td colSpan={10}><CenterLoading/></td>
                    </tr>
                }
                {requests.map((request, index) =>
                    <TrConfirmRequest key={request.id} request={request} offset={offset} index={index}/>
                )}
                </tbody>
            </MyTable>
            <MyPagination count={count} setOffset={setOffset} itemsPerPage={limit}/>

        </MyContainer>
    );
};

DoneRequests.propTypes = {
    status: PropTypes.string.isRequired,
};

export default DoneRequests;