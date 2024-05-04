import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import {CenterLoading} from "../../../../feutures/index.js";
import {formatJsonDateTo_ddMMyyyy, getErrorText} from "../../../../utils/helpers.js";
import {getAnyHousingByIdAPI} from "../../../../http/api/publishHousingAPI.js";
import {ButtonBack, ButtonsRequest, ContainerImages, StatusRequest} from "../../../../components/index.js";
import s from './Request.module.css'
import {MyContainer} from "../../../../feutures/MyContainer/index.js";
import PropTypes from "prop-types";

const FieldItem = ({title, data, ...props}) => {
    return (
        <div {...props} className={s.field_group + ' ' + props.className}>
            <span className={s.title}>{title}</span>
            <p className={s.data}>{data}</p>
        </div>
    )
}

FieldItem.propTypes = {
    title: PropTypes.string,
    data: PropTypes.any,
    className: PropTypes.string,
}

const RequestViewPage = props => {
    const {id} = useParams()
    const [publishHousing, setPublishHousing] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    let housing = publishHousing?.housing_d;

    useEffect(() => {
        setLoading(true)
        getAnyHousingByIdAPI(id)
            .then(data => {
                setPublishHousing(data)
            })
            .catch(err => {
                console.error(err)
                setError(getErrorText(err))
            })
            .finally(() => setLoading(false))
    }, []);


    if (loading) {
        return (
            <div>
                <CenterLoading/>
            </div>
        )
    }

    if (error) {
        return (
            <Container>
                {error}
            </Container>
        )
    }

    return (
        <MyContainer className={s.container}>
            <ButtonBack/>
            <div className={s.container__request}>
                <h3>{housing.name}</h3>
                <StatusRequest status={publishHousing.status_d} />
                <ContainerImages housing={housing} height={'30vh'}/>
                <div className={s.container__info__housing}>
                    <FieldItem title={'Название'} data={housing.name}/>
                    <FieldItem title={'Сокращенное название'} data={housing.short_name}/>
                    <FieldItem title={'Цена'}
                               data={`${publishHousing.price} ${publishHousing.currency_d.publish_name}`}/>
                    <FieldItem title={'Количество мест'} data={housing.number_of_seats}/>
                    <FieldItem title={'Дата публикации'} data={formatJsonDateTo_ddMMyyyy(publishHousing.date_publish)}/>
                    <FieldItem title={'Округ'} data={housing.district_d.name}/>
                    <FieldItem title={'Адрес'} data={housing.address}/>
                    <div className={s.categories}>
                        <span>Категории:</span>
                        {housing.categories_d.map(category =>
                            <p key={category.id}>{category.name}</p>
                        )}
                    </div>
                    <FieldItem title={'Описание'} data={housing.description}
                        style={{gridColumn: '1/3'}}
                    />
                </div>
                <div className={s.footer}>
                    <ButtonsRequest publishHousing={publishHousing} setPublishHousing={setPublishHousing}/>
                </div>
            </div>
        </MyContainer>
    )


};

RequestViewPage.propTypes = {};

export default RequestViewPage;