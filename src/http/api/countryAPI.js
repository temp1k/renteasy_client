import {$api} from "../instance.js";


export const getAllCountriesAPI = async () => {
    const {data} = await $api.get('api/countries/')
    return data
}