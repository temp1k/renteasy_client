import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {PUBLISH_HOUSING_ROUTE} from "../../utils/paths.js";
import {ImageSlider} from "../ImageSlider/index.js";



const HousingCard = ({housing, click=null}) => {
    const navigate = useNavigate()

    if (!click) {
        click = () => {
            navigate(`${PUBLISH_HOUSING_ROUTE}/${housing.id}`)
        }
    }


    return (
        <div onClick={click}>
            <ImageSlider slides={housing.housing_detail.images} />
            <p>{housing.housing_detail.name}</p>
            <p>{housing.price} {housing.currency_detail.publish_name}</p>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.shape({
        id: PropTypes.number,
        housing_detail: PropTypes.object,
        price: PropTypes.string,
        currency_detail: PropTypes.object
    }).isRequired,
    click : PropTypes.func.isRequired,
};

export {HousingCard};