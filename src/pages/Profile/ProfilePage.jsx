import React, {useEffect, useState} from 'react';
import {useUser} from "../../hook/useUser.js";
import {CenterLoading} from "../../feutures/index.js";
import {getUserById} from "../../http/api/usersAPI.js";
import {LinkGuide, UserInfo} from "../../components/index.js";
import {getErrorText} from "../../utils/helpers.js";
import {Container} from "react-bootstrap";
import {ProfileRequests} from "../ProfileRequests/index.js";
import s from './Profile.module.css'


const ProfilePage = () => {
    const {currentUser} = useUser()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getUserById(currentUser.id)
            .then(data => {
                setUser(data)
                console.log(data)
            })
            .catch(err => {
                console.error(err)
                alert(getErrorText(err))
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return (
        <Container className={s.container}>
            <LinkGuide className={s.link_guide}/>
            <p className={s.title}>Страница профиля {currentUser.username}</p>
            {loading &&
                <CenterLoading/>
            }
            {user && !loading &&
                <div>
                    <UserInfo user={user} setUser={setUser}/>
                    <ProfileRequests/>
                </div>
            }
        </Container>
    );
};

export {ProfilePage};