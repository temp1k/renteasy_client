import React, {useEffect, useState} from 'react';
import {CenterLoading, CustomLink} from "../../feutures/index.js";
import {getMyPublishHousingsAPI} from "../../http/api/publishHousingAPI.js";
import {SelfPublishHousingCard} from "../../components/index.js";
import {CustomSelect} from "../../feutures/CustomSelect/index.js";
import {MY_HOUSING_ROUTE, MY_PUBLISH_HOUSING_ROUTE, PRO_SCENE_ROUTE} from "../../utils/consts/paths.js";

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
                setLoading(false)
                console.log(err.response.status)
                if (err.response.status === 404) return
                alert(`Ошбика получения ваших опубликованных мест\n${err}`)

            })
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

            {publishHousings.length < 1 &&
                <div style={{height: '40vh'}} className={'d-flex justify-content-center flex-column'}>
                    <p>У вас нет публикаций</p>
                    <p><CustomLink to={'/'+PRO_SCENE_ROUTE+'/'+MY_HOUSING_ROUTE}>Опубликуйте ваше жилье</CustomLink></p>
                </div>
            }

        </div>
    );
};

export default MyPublishHousingsPage;