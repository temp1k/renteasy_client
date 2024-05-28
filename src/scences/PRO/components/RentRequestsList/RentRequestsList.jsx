import React, {useEffect, useState} from 'react';
import {getLandlordRequestsAPI} from "../../../../http/api/buyRequestsAPI.js";
import {CenterLoading} from "../../../../feutures/index.js";
import {MyPagination} from "../../../../components/index.js";
import {Container} from "react-bootstrap";
import {RentRequestItem} from "../RentRequestItem/index.js";
import s from './RequestsList.module.css'
import {getErrorText} from "../../../../utils/helpers.js";

const RentRequestsList = props => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const limit = 5

    const getRequests = () => {
        getLandlordRequestsAPI({offset, limit, owner_confirm: false})
            .then(data => {
                setRequests(data.results)
                setCount(data.count)
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
                setRequests([])
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getRequests()
    }, [offset]);

    if (loading) {
        return (
            <div className="mt-5">
                <CenterLoading/>
            </div>
        )
    }

    return (
        <Container>
            <div className={s.list_container}>
                {requests.map((request) => {
                    return (
                        <RentRequestItem
                            className={s.list_item}
                            item={request}
                            key={request.id}
                            updateData={getRequests}
                        />
                    )
                })}
            </div>
            <MyPagination count={count} setOffset={setOffset} itemsPerPage={limit}/>
        </Container>
    );
};

RentRequestsList.propTypes = {
    
};

export default RentRequestsList;