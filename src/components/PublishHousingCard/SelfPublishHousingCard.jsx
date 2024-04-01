import React from 'react';
import PropTypes from 'prop-types';
import {ImageSlider} from "../ImageSlider/index.js";
import {Button, Card} from "react-bootstrap";
import '../../pages/MyHousings/css/index.css'
import './publish_housing.css'
import {formatJsonDateTo_ddMMyyyy} from "../../utils/helpers.js";
import {CustomLinkButton} from "../../feutures/index.js";
import {MY_HOUSING_ROUTE} from "../../utils/consts/paths.js";

const SelfPublishHousingCard = ({publishHousing}) => {

    let housing = publishHousing.housing_d
    let date_begin = formatJsonDateTo_ddMMyyyy(publishHousing.date_begin)
    let date_end = formatJsonDateTo_ddMMyyyy(publishHousing.date_end)
    let status = publishHousing.activity ? 'активно' : 'не активно'

    return (
        <div className={'my__card'}>
            <div className={'my__card__img left__img'}>
                <ImageSlider slides={housing.images_d}/>
            </div>
            <Card.Body className={'my__card__body'}>
                <div className={'my__card__title'}><b>Название:</b> <span>{housing.name}</span></div>
                <div className={'my__card__subtitle'}>{housing.short_name}</div>
                <div className={'text__description'}>
                    <b>Описание:</b> {housing.description}
                </div>
                <div className={'my__card__text'}><b>Страна:</b> {housing.country_d.name}</div>
                <div className={'my__card__text__sm'}><b>Категории:</b>{' '}
                    {housing.categories_d.map(category =>
                        <span key={category.id}>{category.name} </span>
                    )}
                </div>
                <div className={'my__card__text__sm'}><b>Теги:</b>{' '}
                    {housing.tags_d.map(tag =>
                        <span key={tag.id}>{tag.name} </span>
                    )}
                </div>
                <div className={'my__card__text'}><b>Статус:</b>{' '}
                    <span className={publishHousing.activity ? 'status status__active' : 'status status__no_active'}>{status}</span>
                </div>
                <div className={'my__card__text'}><b>Даты активности:</b>{' '}
                    С <span className={'str__date'}>{date_begin}</span>{' '}
                    по <span className={'str__date'}>{date_end}</span>
                </div>
            </Card.Body>
            <div className={'my__card__footer'}>
                {/*<CustomLinkButton to={MY_HOUSING_ROUTE + '/' + housing.id}>Изменить</CustomLinkButton>*/}
                <CustomLinkButton to={MY_HOUSING_ROUTE + '/' + housing.id}>Изменить</CustomLinkButton>
                {publishHousing.activity ?
                    <Button variant={'outline-danger'}>Деактивировать</Button>
                    :
                    <Button variant={'outline-success'}>Активировать</Button>
                }
            </div>
        </div>
    );
};

SelfPublishHousingCard.propTypes = {
    publishHousing: PropTypes.object,
};

export default SelfPublishHousingCard;