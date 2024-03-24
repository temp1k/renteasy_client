import React from 'react';
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {ImageSlider} from "../../../components/index.js";
import {CustomLink} from "../../../feutures/index.js";
import '../css/index.css'

const HousingCard = ({housing}) => {
    console.log(housing)
    return (
        <div className={'my__card'}>
            <div className={'my__card__img left__img'}>
                <ImageSlider slides={housing.images}/>
            </div>
            <Card.Body className={'my__card__body'}>
                <Card.Title><b>Название:</b> {housing.name}</Card.Title>
                <Card.Subtitle>{housing.short_name}</Card.Subtitle>
                <Card.Text>
                    <b>Описание:</b>{housing.description}
                </Card.Text>
                <Card.Text>Страна: {housing.country.name}</Card.Text>
                <Card.Text>Категории:{' '}
                    {housing.categories.map(category =>
                        <span key={category.id}>{category.name} </span>
                    )}
                </Card.Text>
                <Card.Text>Теги:{' '}
                    {housing.tags.map(tag =>
                        <span key={tag.id}>{tag.name} </span>
                    )}
                </Card.Text>
            </Card.Body>
            <div className={'my__card__footer'}>
                <CustomLink to={'#'} className={'btn btn-outline-primary'}>Изменить</CustomLink>
            </div>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.object
}

export default HousingCard;