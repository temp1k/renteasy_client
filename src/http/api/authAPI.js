import {$api, $apiAuth} from "../instance.js";


export const loginAPI = async (login, password) => {
    const {data} = await $api.post('api/token/', {username: login, password: password})
    localStorage.setItem('refresh', data.refresh)
    localStorage.setItem('access', data.access)
    return data;
}

export const regAPI = async (userData) => {
    const {data} = await $api.post('api/users/', userData);
    return data;
}

export const refreshTokenAPI = async (refresh_token) => {
    try {
        const response = await $apiAuth.post('api/token/refresh/', {
            refresh: refresh_token
        });

        // Обновите access и refresh токены в localStorage или где-то еще
        localStorage.setItem('access', response.data.access);

        return response.data.access;
    } catch (error) {
        console.error('Ошибка обновления токенов', error);
        throw error;
    }
};

export const getUrlServer = async () => {
    const {data} = await $apiAuth.get('api/get_url')
    return data;
}

export const changeUserAPI = async (id, user) => {
    const {data} = await $apiAuth.put(`api/users/${id}/change/`, user)
    return data
}

export const getUserByIdAPI = async (user_id) => {
    const {data} = await $api.get('api/users/'+user_id)
    return data
}

export const virifyTokenAPI = async (jwt) => {
    const response = await $api.post('api/token/verify/', {token: jwt})
    return response
}


export const sendCodeEmailAPI = async (email) => {
    const {data} = await $apiAuth.post('api/send_code_email/', {email})
    return data
}

export const checkCodeAPI = async (code) => {
    const {data} = await $apiAuth.post('api/check_code/', code)
    return data
}