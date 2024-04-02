import React, {useEffect, useState} from 'react';
import {CenterLoading} from "../../feutures/index.js";
import {getMyPublishHousingsAPI} from "../../http/api/publishHousingAPI.js";
import {SelfPublishHousingCard} from "../../components/index.js";
import {CustomSelect} from "../../feutures/CustomSelect/index.js";

const MyPublishHousingsPage = () => {
    const [activity, setActivity] = useState('')
    const [loading, setLoading] = useState(true)
    const [publishHousings, setPublishHousings] = useState([])

    const resetPage = () => {
        setPublishHousings([])
        setLoading(true)
    }


    useEffect(() => {
        resetPage()
        getMyPublishHousingsAPI(activity)
            .then(data => {
                console.log(data)
                setPublishHousings(data.housings)
                setLoading(false)
            })
            .catch(err => {
                console.warn(err)
                alert(`Ошбика получения ваших опубликованных мест\n${err}`)
                setLoading(false)
            })
        console.log('useEffect')
    }, [activity]);

    const changeFilterSelectHandler = (e) => {
        setActivity(e.target.value)
        console.log('change select')
    }


    return (
        <div>
            <div className="label__page">Мои опубликованные места</div>
            <div className="container__select">
                <CustomSelect
                    onChange={changeFilterSelectHandler}
                    label={'Фильтр:'}
                >
                    <option value="" selected>Все</option>
                    <option value='true'>Активные</option>
                    <option value="false">Не активные</option>
                </CustomSelect>
            </div>
            {loading &&
                <div className={'mt-5'}>
                    <CenterLoading/>
                </div>
            }
            {publishHousings.map(ph =>
                <SelfPublishHousingCard key={ph.id} publishHousing={ph}/>
            )}

        </div>
    );
};

export default MyPublishHousingsPage;