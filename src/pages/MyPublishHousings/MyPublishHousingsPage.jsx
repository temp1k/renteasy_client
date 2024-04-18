import React, {useEffect, useState} from 'react';
import {CenterLoading, CustomLink} from "../../feutures/index.js";
import {getMyPublishHousingsAPI} from "../../http/api/publishHousingAPI.js";
import {MyPagination, SelfPublishHousingCard} from "../../components/index.js";
import {CustomSelect} from "../../feutures/CustomSelect/index.js";
import {MY_HOUSING_ROUTE, MY_PUBLISH_HOUSING_ROUTE, PRO_SCENE_ROUTE} from "../../utils/consts/paths.js";

const MyPublishHousingsPage = () => {
    const [activity, setActivity] = useState('')
    const [loading, setLoading] = useState(true)
    const [publishHousings, setPublishHousings] = useState([])
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const limit = 2

    const resetPage = () => {
        setPublishHousings([])
        setLoading(true)
    }


    useEffect(() => {
        resetPage()
        getMyPublishHousingsAPI(activity, {limit, offset})
            .then(data => {
                console.log(data)
                setPublishHousings(data.results)
                setCount(data.count)
                setLoading(false)
            })
            .catch(err => {
                console.warn(err)
                setLoading(false)
                console.log(err.response.status)
                if (err.response.status === 404) return
                alert(`Ошбика получения ваших опубликованных мест\n${err}`)
            })
    }, [activity, offset]);

    const changeFilterSelectHandler = (e) => {
        setActivity(e.target.value)
        setOffset(0)
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

            {publishHousings.length < 1 && !loading &&
                <SwitchLabelComponent selectedActivity={activity} />
            }
            <MyPagination count={count} setOffset={setOffset} itemsPerPage={limit}/>

        </div>
    );
};

export default MyPublishHousingsPage;


const SwitchLabelComponent = ({selectedActivity}) => {
    switch(selectedActivity) {
        case 'true':
            return (
                <div style={{height: '40vh'}} className={'d-flex justify-content-center flex-column'}>
                    <p>У вас нет активных публикаций</p>
                </div>
            )
        case 'false':
            return (
                <div style={{height: '40vh'}} className={'d-flex justify-content-center flex-column'}>
                    <p>У вас нет неактивных публикаций</p>
                </div>
            )
        default:
            return (
                <div style={{height: '40vh'}} className={'d-flex justify-content-center flex-column'}>
                    <p>У вас нет публикаций</p>
                    <p><CustomLink to={'/' + PRO_SCENE_ROUTE + '/' + MY_HOUSING_ROUTE}>Опубликуйте ваше
                        жилье</CustomLink></p>
                </div>
            )
    }
}