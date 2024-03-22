import {$api} from "../../../http/instance.js";


export const loginAPI = async (login, password) => {
    const {data} = await $api.post('api/token/', {username: login, password: password})
    localStorage.setItem('refresh', data.refresh)
    return data;
}