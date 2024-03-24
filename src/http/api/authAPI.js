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

export const getUserById = async (user_id) => {
    const {data} = await $api.get('api/users/'+user_id)
    return data
}