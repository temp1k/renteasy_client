import axios from "axios";
import {refreshTokenAPI} from "./api/authAPI.js";


const apiURL = "http://127.0.0.1:8000/";

const $api = axios.create({
    baseURL: apiURL
})

const $apiAuth = axios.create({
    baseURL: apiURL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('access')}`
    return config
}

$apiAuth.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response.status === 401 && error.response.data.message === 'Invalid access token') {
            const refresh = localStorage.getItem('refresh')
            const newAccessToken = await refreshTokenAPI(refresh);

            // Повторите запрос с новым access токеном
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios.request(error.config);
        }

        return Promise.reject(error);
    }
);


$apiAuth.interceptors.request.use(authInterceptor)

export {
    $api,
    $apiAuth,
}