import React from 'react';
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {ImageSlider} from "../../../components/index.js";
import {CustomLinkButton} from "../../../feutures/index.js";
import '../css/index.css'
import {MY_HOUSING_ROUTE} from "../../../utils/consts/paths.js";

const HousingCard = ({housing}) => {
    console.log(housing)
    return (
        <div className={'my__card'}>
            <div className={'my__card__img left__img'}>
                <ImageSlider slides={housing.images_d}/>
            </div>
            <Card.Body className={'my__card__body'}>
                <div><b>Название:</b> <span className={'my__card__title'}>{housing.name}</span></div>
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
            </Card.Body>
            <div className={'my__card__footer'}>
                <CustomLinkButton to={MY_HOUSING_ROUTE + '/' + housing.id}>Изменить</CustomLinkButton>
            </div>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.object
}

export default HousingCard;