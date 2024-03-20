import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const HousingCard = ({housing, click}) => {

    return (
        <div onClick={click}>
            <p>{housing.housing_detail.name}</p>
            <p>{housing.price} {housing.currency_detail.publish_name}</p>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.shape({
        housing_detail: PropTypes.object,
        price: PropTypes.string,
        currency_detail: PropTypes.object
    }).isRequired
};

export default HousingCard;