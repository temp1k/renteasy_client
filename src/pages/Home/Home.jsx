import React from 'react';
import {getPublishHousingAPI} from "./api";
import {Search} from "./components/Search/index.js";
import {HousingCardList} from "../../components/index.js";


const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Search />
            <HousingCardList fetchFunc={getPublishHousingAPI}/>
        </div>
    );
};

export {Home};