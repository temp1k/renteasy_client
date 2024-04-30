import React from 'react';
import PropTypes from 'prop-types';
import './housing_card.css'
import {CustomLinkButton} from "../../feutures/index.js";
import {MY_HOUSING_ROUTE} from "../../utils/consts/paths.js";
import {useLocation} from "react-router-dom";
import {ImageSlider} from "../ImageSlider/index.js";

const HousingCard = ({housing, haveImage=false}) => {
    const location = useLocation()
    const currentPath = location.pathname
    const changeHousingPath = `/pro/${MY_HOUSING_ROUTE}/${housing.id}`

    return (
        <div className={'container__housing'}>
            <div>
                {haveImage &&
                    <ImageSlider slides={housing.images_d} imgWidth={150} imgHeight={150}/>
                }
            </div>
            <div className={'card__body'}>
                <div>
                    <p className="card__header">{housing.name}</p>
                    <p><b>Адрес:</b> {housing.district_d.name} округ, {housing.address}</p>
                    <p><b>Кол-во мест:</b> {housing.number_of_seats}</p>
                </div>
                <div className="card__footer">
                    {currentPath !== changeHousingPath &&
                        <CustomLinkButton to={changeHousingPath}>Изменить</CustomLinkButton>
                    }
                </div>
            </div>
        </div>
    );
};

HousingCard.propTypes = {
    housing: PropTypes.object
};

export default HousingCard;