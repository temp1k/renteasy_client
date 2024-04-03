import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {ButtonBack} from "../../components/index.js";
import {Container} from "react-bootstrap";
import './publish_housing.css'
import {CenterLoading} from "../../feutures/index.js";
import {getPublishHousingByIdAPI} from "../../http/api/publishHousingAPI.js";

const PublishHousingPage = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [publishHousing, setPublishHousing] = useState({})
    let housing = publishHousing?.housing_d

    useEffect(() => {
        getPublishHousingByIdAPI(id)
            .then(data => {
                setPublishHousing(data)
                setLoading(false)
            })
            .catch(err =>{
                alert('Ошибка получения записи!')
                setLoading(false)
                console.warn(err)
            })
    }, []);

    if (loading) {
        return (
            <div>
                <CenterLoading />
            </div>
        )
    }

    return (
        <Container className={'container__ph_page'}>
            <ButtonBack className={'button__back'}>Назад</ButtonBack>
            <div className="ph__card">
                <p className={'title_housing'}>{housing.name}</p>
                <div className="container_images">
                    {housing.images_d.map(img =>
                        <div key={img.id} className={'container_img'}>
                            <img  src={img.image} alt={`Изображение ${housing.name}`}/>
                        </div>
                    )}
                </div>
                <div className="ph_card_body">
                    <div className="ph_info">
                        <p>{housing.country_d.name}</p>
                        <p>Гостей: {housing.number_of_seats}</p>
                        <p>Рейтинг: {housing.rating}</p>
                        <hr/>
                        <p>{housing.description}</p>
                    </div>
                    <div className="brone">
                        <p>Цена за ночь: {publishHousing.price} {publishHousing.currency_d.name}</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export {PublishHousingPage};