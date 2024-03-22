import React from 'react';
import {useUser} from "../../hook/useUser.js";


const ProfilePage = () => {
    const user = useUser()
    console.log(user)
    return (
        <div>
            Страница профиля {user.username}
        </div>
    );
};

export {ProfilePage};