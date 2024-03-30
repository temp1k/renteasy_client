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
                <div className={'my__card__title'}><b>Название:</b> {housing.name}</div>
                <div className={'my__card__subtitle'}>{housing.short_name}</div>
                <div className={'text__description'}>
                    <b>Описание:</b>{housing.description}
                </div>
                <div className={'my__card__text'}><b>Страна:</b> {housing.country.name}</div>
                <div className={'my__card__text'}><b>Категории:</b>{' '}
                    {housing.categories.map(category =>
                        <span key={category.id}>{category.name} </span>
                    )}
                </div>
                <div className={'my__card__text'}><b>Теги:</b>{' '}
                    {housing.tags.map(tag =>
                        <span key={tag.id}>{tag.name} </span>
                    )}
                </div>
            </Card.Body>
            <div className={'my__card__footer'}>
                <CustomLinkButton to={MY_HOUSING_ROUTE+'/'+housing.id}>Изменить</CustomLinkButton>
            </div>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.object
}

export default HousingCard;