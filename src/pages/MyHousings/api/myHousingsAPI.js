import {$apiAuth} from "../../../http/instance.js";


export const getMyHousingsAPI = async () => {
    const {data} = await $apiAuth.get('api/housings/my/')
    return data
}