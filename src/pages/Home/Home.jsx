import React, {useEffect, useState} from 'react';
import {getPublishHousingAPI} from "./api";
import {Search} from "./components/Search/index.js";
import {HousingCardList} from "../../components/index.js";


const Home = () => {
    const [housings, setHousings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const getPublishHousing = (country='', name='', begin_date='', end_date='') => {
        setLoading(true)
        getPublishHousingAPI({country, name, begin_date, end_date})
            .then(data => {
                setHousings(data.results)
                setLoading(false)
            })
            .catch(err =>{
                console.warn(err)
                setError(err)
                setLoading(false)
            })
    }


    useEffect(() => {
        getPublishHousing()
    }, []);

    return (
        <div>
            <h3>Главная</h3>
            <Search fetchFunc={getPublishHousing}/>
            <HousingCardList housings={housings} loading={loading} error={error}/>
        </div>
    );
};

export {Home};