import React, {useEffect, useState} from 'react';
import {useUser} from "../../hook/useUser.js";
import {CenterLoading} from "../../feutures/index.js";
import {getUserById} from "../../http/api/usersAPI.js";


const ProfilePage = () => {
    const {currentUser, login} = useUser()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getUserById(currentUser.id)
            .then(data => {

            })
    }, []);

    console.log(currentUser)
    return (
        <div>
            Страница профиля {currentUser.username}
            {loading &&
                <CenterLoading />
            }
        </div>
    );
};

export {ProfilePage};