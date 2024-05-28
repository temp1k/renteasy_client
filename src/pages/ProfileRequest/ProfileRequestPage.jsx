import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from "react-router-dom";
import {getProfileRequestAPI} from "../../http/api/buyRequestsAPI.js";
import {formatJsonDateTo_ddMMyyyy, getErrorText} from "../../utils/helpers.js";
import {Container} from "react-bootstrap";
import {CenterLoading} from "../../feutures/index.js";
import {ImageSlider} from "../../components/index.js";
import {FaRegFileWord, FaStar} from "react-icons/fa";
import s from './ProfileRequest.module.css'

const ProfileRequestPage = props => {
    const {id} = useParams()
    const [request, setRequest] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    const getRequest = () => {
        getProfileRequestAPI(id)
            .then(data => {
                setRequest(data)
                console.log(data)
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
                if (err.response?.status === 404) {
                    navigate('/404', {replace: true})
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getRequest()
    }, []);

    if (loading) {
        return (
            <div className="mt-5">
                <CenterLoading/>
            </div>
        )
    }

    let housing = request.product_d?.housing_d
    let currency = request.product_d.currency_d.publish_name

    return (
        <Container>
            <h4>{housing.name}</h4>
            <div className={s.container_housing}>
                <div className={s.first_column}>
                    <ImageSlider slides={housing.images_d} imgWidth={280} imgHeight={250}/>
                    <div className={s.categories}>
                        {housing.categories_d.map(category =>
                            <span className={s.category} key={category.id}>{category.name}</span>
                        )}
                    </div>
                    <p className={s.rating_container}>
                        Рейтинг:{' '}
                        <span className={s.rating}>
                            {housing.rating} <FaStar className={'ph_icon'}/>
                        </span>
                    </p>
                </div>
                <div className={s.second_column}>
                    <p>
                        <b>Описание: </b>{housing.description}
                    </p>
                    <p>
                        <b>Арендодатель: </b>{request.owner.username} ({request.owner.FIO})
                    </p>
                    <p>
                        <b>Даты: </b>
                        с <span className={s.date}>{formatJsonDateTo_ddMMyyyy(request.date_begin)} </span>
                        по <span className={s.date}>{formatJsonDateTo_ddMMyyyy(request.date_end)}</span>
                    </p>
                    <p>
                        <b>Количество мест: </b>{request.number_of_seats}
                    </p>
                    <p>Цена: <span>{request.price} {currency}</span></p>
                    <p>Статус: <span>{request.buyer_confirm & request.owner_confirm ? 'Одобрено' : 'Не одобрено'}</span></p>
                    {request.contract &&
                        <p>Договор:
                            <a href={request.contract}>
                                <FaRegFileWord />
                                <span>Скачать договор</span>
                            </a>
                        </p>
                    }
                </div>
            </div>
            <div>

            </div>
        </Container>
    );
};

ProfileRequestPage.propTypes = {};

export default ProfileRequestPage;