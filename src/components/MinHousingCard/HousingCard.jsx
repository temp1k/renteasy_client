import React from 'react';
import PropTypes from 'prop-types';
import './housing_card.css'

const HousingCard = ({housing}) => {
    return (
        <div className={'container__housing'}>
            <p className="card__header">{housing.name}</p>
            <p><b>Адрес:</b> {housing.country_d.name}, {housing.address}</p>
            <p><b>Кол-во мест:</b> {housing.number_of_seats}</p>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.object
};

export default HousingCard;