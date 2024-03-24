import React from 'react';
import {useUser} from "../../hook/useUser.js";


const ProfilePage = () => {
    const {currentUser} = useUser()
    console.log(currentUser)
    return (
        <div>
            Страница профиля {currentUser.username}
        </div>
    );
};

export {ProfilePage};