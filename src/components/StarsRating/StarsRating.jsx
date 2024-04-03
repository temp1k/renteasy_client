import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaRegStar, FaStar} from "react-icons/fa";
import './stars_rating.css'

const StarsRating = ({onChangeRating, defaultRating=0, ...props}) => {
    const [rating, setRating] = useState(defaultRating);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        onChangeRating(selectedRating);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) =>
                    <span className={'star_rating'} key={star} onClick={() => {
                        defaultRating === 0 ? handleStarClick(star) : {}
                    }}>
          {star <= rating ? <FaStar /> : <FaRegStar />}
        </span>
            )}
        </div>
    );
};

StarsRating.propTypes = {
    onChangeRating: PropTypes.func,
    defaultRating: PropTypes.number,
};

export default StarsRating;