import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {PUBLISH_HOUSING_ROUTE} from "../../utils/consts/paths.js";
import {ImageSlider} from "../ImageSlider/index.js";



const HousingCard = ({housing, ...props}) => {
    const navigate = useNavigate()

    let click;
    if (props.click === undefined) {
        click = () => {
            navigate(`${PUBLISH_HOUSING_ROUTE}/${housing.id}`)
        }
    }
    else click = props.click


    return (
        <div onClick={click}>
            <ImageSlider slides={housing.housing_d.images_d} />
            <p>{housing.housing_d.name}</p>
            <p>{housing.price} {housing.currency_d.publish_name}</p>
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
    click : PropTypes.func,
};

export {HousingCard};