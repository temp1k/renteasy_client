import React, {useEffect, useState} from 'react';
import {getMyHousingsAPI} from "./api/myHousingsAPI.js";
import {CenterLoading} from "../../feutures/index.js";
import HousingCard from "./components/HousingCard.jsx";

const MyHousingsPage = () => {
    const [housings, setHousings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMyHousingsAPI()
            .then(data => {
                setHousings(data.housings)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    if (loading) {
        return (
            <div className="h-100">
                <CenterLoading />
            </div>
        )
    }

    return (
        <div>
            Мои места
            {housings.map((housing) => {
                return (
                    <HousingCard housing={housing} key={housing.id}/>
                );
            })}
        </div>
    );
};

export default MyHousingsPage;