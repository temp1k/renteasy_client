import {$api} from "../instance.js";


export const getAllDistrictsAPI = async (params={}) => {
    const {data} = await $api.get('api/districts/', {params})
    return data
}

export const getAllCitiesAPI = async (params={}) => {
    const {data} = await $api.get('api/cities/', {params})
    return data
}