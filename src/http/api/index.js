import {$api} from "../instance.js";


export const login = async (loginRequest) => {
    const {data} = await $api.post('api/token', loginRequest);
    return data;
}