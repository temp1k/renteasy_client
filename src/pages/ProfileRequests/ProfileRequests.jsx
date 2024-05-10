import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useUser} from "../../hook/useUser.js";
import {Container} from "react-bootstrap";
import {USER_ROLE} from "../../utils/consts/roles.js";
import {getProfileRequestsAPI} from "../../http/api/buyRequestsAPI.js";
import {CustomLinkButton} from "../../feutures/index.js";
import {formatJsonDateTo_ddMMyyyy_HHmm} from "../../utils/helpers.js";
import {MY_REQUESTS_ROUTE} from "../../utils/consts/paths.js";
import {FaEye} from "react-icons/fa";
import s from './ProfileRequests.module.css'

const ProfileRequests = props => {
    const {currentUser} = useUser()
    const [requests, setRequests] = useState([])

    useEffect(() => {
        currentUser.roles[0] === USER_ROLE &&
        getProfileRequestsAPI()
            .then(data => {
                setRequests(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    if (currentUser.roles[0] !== USER_ROLE) {
        return (
            <></>
        )
    }


    return (
        <Container>
            <h6>Ваши аренды:</h6>
            <div className={s.requests_container}>
                {requests.length && requests.map(request =>
                    <RequestItem item={request} key={request.id} />
                )}
            </div>
        </Container>
    );
};

ProfileRequests.propTypes = {
    
};


const RequestItem = ({item}) => {
    const [request, setRequest] = useState(item)
    let housing = request?.product_d

    return (
        <div className={s.request_container}>
            <div className={s.card__body}>
                <div>
                    <p className="card__header">{housing.name}</p>
                    <p><b>Адрес:</b> {housing.district.name} округ, {housing.address}</p>
                    <p><b>Мест:</b> {request.number_of_seats}</p>
                    <p>
                        <b>Даты: </b>
                        C <span>{formatJsonDateTo_ddMMyyyy_HHmm(request.date_begin)} </span>
                        ПО <span>{formatJsonDateTo_ddMMyyyy_HHmm(request.date_end)}</span>
                    </p>
                    <p><b>Арендодатель:</b> {request.owner.FIO}</p>
                    <p><b>Статус:</b> {request.buyer_confirm & request.owner_confirm ? 'Одобрено' : 'Не одобрено'}</p>
                    <p><b>Цена:</b> {request.price} {request.product_d.currency_name}</p>
                    {request.contract &&
                        <p><a href={request.contract}>Скачать договор</a></p>
                    }
                </div>
                <CustomLinkButton
                    to={MY_REQUESTS_ROUTE+'/'+request.id}
                    className={s.btn_view}
                >
                    <FaEye />
                </CustomLinkButton>
            </div>
        </div>
    )
}

export default ProfileRequests;