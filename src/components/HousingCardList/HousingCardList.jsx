import React, {useEffect} from 'react';
import {HousingCard} from "../HousingsCard/index.js";
import {CenterLoading} from "../../feutures/index.js";
import {Container} from "react-bootstrap";
import PropTypes from "prop-types";
import './housing_cards_list.css'

// eslint-disable-next-line react/prop-types
const HousingCardList = ({housings, loading, error, ...props}) => {
    return (
        <Container
            {...props}
        >
            <p className={'error'}>{error}</p>
            {loading ? (
                <CenterLoading/>
            ) : (
                <div className={'container__housing_cards'}>
                    {housings.map(housing =>
                        <div key={housing.id}>
                            <HousingCard housing={housing} />
                        </div>
                    )}
                </div>
            )}

        </Container>
    );
};

HousingCardList.propTypes = {
    housings: PropTypes.array,
    loading: PropTypes.bool
}

export {HousingCardList};