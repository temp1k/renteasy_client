import React, {useEffect, useState} from 'react';
import {getMyHousingsAPI} from "./api/myHousingsAPI.js";
import {CenterLoading, CustomLink, CustomLinkButton} from "../../feutures/index.js";
import HousingCard from "./components/HousingCard.jsx";
import {HOUSING_CREATE_ROUTE} from "../../utils/consts/paths.js";
import {MyPagination} from "../../components/index.js";

const MyHousingsPage = () => {
    const [housings, setHousings] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const limit = 2

    useEffect(() => {
        getMyHousingsAPI({offset, limit})
            .then(data => {
                setHousings(data.results)
                setCount(data.count)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [offset]);

    if (loading) {
        return (
            <div className="h-100">
                <CenterLoading/>
            </div>
        )
    }

    return (
        <div className={'container'}>
            <h4 className={'label__page'}>Мои места</h4>
            <div className={'d-flex justify-content-end m-2'}>
                <CustomLinkButton to={HOUSING_CREATE_ROUTE}>Добавить жилье</CustomLinkButton>
            </div>

            {housings.map((housing) => {
                return (
                    <HousingCard housing={housing} key={housing.id}/>
                );
            })}
            {housings.length < 1 &&
                <div>
                    <p>У вас нет жилья</p>
                    <p><CustomLink to={HOUSING_CREATE_ROUTE}>Создайте ваше первое жилье</CustomLink></p>
                </div>
            }
            <MyPagination count={count} setOffset={setOffset} itemsPerPage={limit}/>
        </div>
    );
};

export default MyHousingsPage;