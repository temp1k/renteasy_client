import {$apiAuth} from "../../../http/instance.js";


export const getMyHousingsAPI = async (params={}) => {
    const {data} = await $apiAuth.get('api/housings/my/', {params})
    return data
}