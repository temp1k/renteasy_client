import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {PUBLISH_HOUSING_ROUTE} from "../../utils/consts/paths.js";
import {ImageSlider} from "../ImageSlider/index.js";
import './housing_card.css'
import {formatJsonDateTo_ddMMyyyy} from "../../utils/helpers.js";
import {IoIosPeople} from "react-icons/io";



const HousingCard = ({housing, ...props}) => {
    const navigate = useNavigate()

    let startDate = formatJsonDateTo_ddMMyyyy(housing.date_begin)
    let endDate = formatJsonDateTo_ddMMyyyy(housing.date_end)
    let country = housing.housing_d.country_d.name

    let click;
    if (props.click === undefined) {
        click = () => {
            navigate(`${PUBLISH_HOUSING_ROUTE}/${housing.id}`)
            // window.open(`${PUBLISH_HOUSING_ROUTE}/${housing.id}`, '_blank');
        }
    }
    else click = props.click


    return (
        <div onClick={click} className={'container__card'}>
            <div className={'card__imgs'}>
                <ImageSlider slides={housing.housing_d.images_d} imgWidth={250} imgHeight={240}/>
            </div>
            <div className={'card__body'}>
                <div className={'header__card'}>
                    <p className={'housing__name'}>{housing.housing_d.name} ({country})</p>
                    <div className={'housing__number'}>{housing.housing_d.number_of_seats} <IoIosPeople /></div>
                </div>
                <p className="housing__dates">{startDate} - {endDate}</p>
                <p className={'housing__price'}><span className={'price__info'}>{housing.price} {housing.currency_d.publish_name}</span> день</p>
            </div>
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