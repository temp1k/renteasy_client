import React, {useEffect} from 'react';
import {useUser} from "../../hook/useUser.js";
import {CenterLoading} from "../../feutures/index.js";
import {subscribeProAPI} from "./api/subscribeProAPI.js";
import {useNavigate} from "react-router-dom";
import {PRO_SCENE_ROUTE} from "../../utils/consts/paths.js";

const SubscribeProPage = () => {
    const {updateRoles} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        subscribeProAPI()
            .then(data => {
                console.log(data);
                updateRoles(data.groups)
                navigate('/', {replace: true})
            })
            .catch(err => {
                console.error(err)
            })
    }, []);


    return (
        <div style={{height: '100vh'}}>
            <CenterLoading />
        </div>
    );
};

export default SubscribeProPage;