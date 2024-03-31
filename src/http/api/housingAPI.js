import {$apiAuth} from "../instance.js";


export const getHousingById = async (id) => {
    const {data} = await $apiAuth('/api/housings/'+id)
    return data
}