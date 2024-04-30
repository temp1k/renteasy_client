import {$apiAuth} from "../../../http/instance.js";

export const getRequestsAPI = async (params={}) => {
    const {data} = await $apiAuth.get('api/published_housings/requests', {params})
    return data
}