import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ButtonBack, BuyForm, ContainerImages, Feedbacks, PostFeedback} from "../../components/index.js";
import {Container} from "react-bootstrap";
import './publish_housing.css'
import {CenterLoading, CustomLinkButton} from "../../feutures/index.js";
import {checkBuyProductAPI, getPublishHousingByIdAPI} from "../../http/api/publishHousingAPI.js";
import {useUser} from "../../hook/useUser.js";
import {MY_PUBLISH_HOUSING_ROUTE, PRO_SCENE_ROUTE} from "../../utils/consts/paths.js";
import {FaStar} from "react-icons/fa";
import {IoIosPeople} from "react-icons/io";
import {getFeedbackByProductAPI} from "../../http/api/feedbackAPI.js";

const PublishHousingPage = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [publishHousing, setPublishHousing] = useState({})
    const [feedbacks, setFeedbacks] = useState([])
    let housing = publishHousing?.housing_d
    const {currentUser} = useUser()
    const [isBuy, setIsBuy] = useState(false)

    useEffect(() => {
        getPublishHousingByIdAPI(id)
            .then(data => {
                setPublishHousing(data)
                setLoading(false)
                checkBuyProductAPI(data.id)
                    .then(result => {
                        setIsBuy(result)
                    })
                    .catch(err => {
                        console.error(err)
                    })
                console.log('check')
            })
            .catch(err => {
                alert('Ошибка получения записи!')
                setLoading(false)
                console.warn(err)
            })

        getFeedbackByProductAPI({product: id})
            .then(data => {
                console.log(data)
                setFeedbacks(data.results)
            })
            .catch(err => {
                console.warn(err)
            })
    }, []);

    if (loading) {
        return (
            <div>
                <CenterLoading/>
            </div>
        )
    }

    const addFeedback = (feedback) => {
        setFeedbacks([feedback, ...feedbacks])
    }

    return (
        <Container className={'container__ph_page'}>
            <ButtonBack className={'button__back'}>Назад</ButtonBack>
            {currentUser.id === housing.owner_d.id &&
                <CustomLinkButton to={`/${PRO_SCENE_ROUTE}/${MY_PUBLISH_HOUSING_ROUTE}/${publishHousing.id}`}
                                  className={'change__button'}
                >
                    Изменить
                </CustomLinkButton>
            }

            <div className="ph__card">
                <p className={'title_housing'}>{housing.name}</p>
                <ContainerImages housing={housing}/>
                <div className="ph_card_body">
                    <div className="ph_info">
                        <p className={'ph_address'}>{housing.district_d.name} округ, {housing.address}</p>
                        <div className="ph_categories">
                            {housing.categories_d.map(category =>
                                <span key={category.id}>{category.name}</span>
                            )}
                        </div>
                        <div>
                            <p className={'ph_numbers'}>Гостей: {housing.number_of_seats} <IoIosPeople
                                className={'ph_icon'}/></p>
                            <p className={'ph_rating'}>Рейтинг:
                                <span>
                                    {housing.rating} <FaStar className={'ph_icon'}/>
                                </span>
                            </p>
                        </div>
                        <hr/>
                        <p className={'ph_description'}>{housing.description}</p>
                        <br/>
                        <div className="container_ph_owner">
                            <span>Хозяин: {housing.owner_d.username}</span>
                            <CustomLinkButton to={`chat/${publishHousing.id}`}>Написать хозяину</CustomLinkButton>
                        </div>
                    </div>
                    <BuyForm publishHousing={publishHousing}/>
                </div>
            </div>
            <br/>
            {currentUser.id !== housing.owner_d.id
                && currentUser.isAuth
                && isBuy &&
                <div className={'container container_button_feedback'}>
                    <PostFeedback addFeedback={addFeedback}
                                  publishHousing={publishHousing}/>
                </div>
            }
            <Feedbacks feedbacks={feedbacks}/>
        </Container>
    );
};

export {PublishHousingPage};