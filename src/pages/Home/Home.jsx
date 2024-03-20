import React, {useEffect, useState} from 'react';
import {getPublishHousingAPI} from "./api";
import {HousingCard} from "../../components/HousingsCard";
import {Search} from "./components/Search/index.js";

const Home = () => {
    const [housings, setHousings] = useState([])

    useEffect(() => {
        getPublishHousingAPI()
            .then(data => {
                console.log(data)
                setHousings(data.results)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <Search />
            {housings.map(housing =>
                <HousingCard key={housing.id} housing={housing} click={() => alert('click')} />
            )}
        </div>
    );
};

export default Home;