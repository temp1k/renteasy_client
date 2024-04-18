import React, {useEffect, useState} from 'react';
import {getPublishHousingAPI} from "./api";
import {Search} from "./components/Search/index.js";
import {HousingCardList, MyPagination} from "../../components/index.js";
import './home.css'


const Home = () => {
    const [housings, setHousings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)
    const limit = 12

    const getPublishHousing = (country='', name='', begin_date='', end_date='') => {
        setLoading(true)
        setError('')
        getPublishHousingAPI({country, name, begin_date, end_date, offset, limit})
            .then(data => {
                setHousings(data.results)
                setLoading(false)
                setCount(data.count)
            })
            .catch(err =>{
                console.warn(err)
                setError(err.message)
                setLoading(false)
            })
    }


    useEffect(() => {
        getPublishHousing()
    }, [offset]);

    return (
        <div className='container__home'>
            <h3>Главная</h3>
            <Search fetchFunc={getPublishHousing}/>
            <HousingCardList className='container__list' housings={housings} loading={loading} error={error}/>
            <MyPagination className='pagination' count={count} itemsPerPage={limit} setOffset={setOffset} />
        </div>
    );
};

export {Home};