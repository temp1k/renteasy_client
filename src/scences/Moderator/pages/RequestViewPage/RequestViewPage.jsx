import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import {CenterLoading} from "../../../../feutures/index.js";
import {formatJsonDateTo_ddMMyyyy, getErrorText} from "../../../../utils/helpers.js";
import {getPublishHousingByIdAPI} from "../../../../http/api/publishHousingAPI.js";
import {ButtonBack, ContainerImages} from "../../../../components/index.js";
import s from './Request.module.css'
import {MyContainer} from "../../../../feutures/MyContainer/index.js";

const FieldItem = ({title, data}) =>{
    return (
        <div>
            <span>{title}</span>
            <p>{data}</p>
        </div>
    )
}

const RequestViewPage = props => {
    const {id} = useParams()
    const [publishHousing, setPublishHousing] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    let housing = publishHousing?.housing_d;

    useEffect(() => {
        setLoading(true)
        getPublishHousingByIdAPI(id)
            .then(data =>{
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
                <CenterLoading />
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
            <ButtonBack />
            <div className={s.container__request}>
                <h3>{housing.name}</h3>
                <ContainerImages housing={housing} height={'30vh'}/>
                <div className={s.container__info__housing}>
                    <FieldItem title={'Название'} data={housing.name}/>
                    <FieldItem title={'Сокращенное название'} data={housing.short_name}/>
                    <FieldItem title={'Описание'} data={housing.description}/>
                    <FieldItem title={'Цена'} data={`${publishHousing.price} ${publishHousing.currency_d.publish_name}`}/>
                    <FieldItem title={'Дата публикации'} data={formatJsonDateTo_ddMMyyyy(publishHousing.date_publish)}/>
                    <FieldItem title={'Округ'} data={housing.district_d.name}/>
                    <div className={s.categories}>
                        <span>Категории:</span>
                        {housing.categories_d.map(category =>
                            <p key={category.id}>{category.name}</p>
                        )}
                    </div>
                </div>
            </div>
        </MyContainer>
    )


};

RequestViewPage.propTypes = {

};

export default RequestViewPage;