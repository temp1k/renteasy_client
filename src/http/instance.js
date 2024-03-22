import axios from "axios";


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

$apiAuth.interceptors.request.use(authInterceptor)

export {
    $api,
    $apiAuth,
}