import React, {useEffect, useState} from 'react';
import {HousingCard} from "../HousingsCard/index.js";
import {CenterLoading} from "../../feutures/index.js";

// eslint-disable-next-line react/prop-types
const HousingCardList = ({fetchFunc}) => {
    const [housings, setHousings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        fetchFunc()
            .then(data => {
                setHousings(data.results)
                setLoading(false)
            })
            .catch(err => {
                console.error(err.message)
                setError(err.message)
            })
    }, []);

    return (
        <div>
            {loading ? (
                <CenterLoading />
            ) : (
                housings.map(housing =>
                    <HousingCard key={housing.id} housing={housing}/>
                )
            )}
            <p>{error}</p>

        </div>
    );
};

export {HousingCardList};