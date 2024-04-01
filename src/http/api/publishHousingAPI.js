import {$apiAuth} from "../instance.js";

export const createPublishHousingAPI = async (publish_housing) => {
    const {data} = await $apiAuth.post('/api/published_housings/', publish_housing)
    return data
}

export const getMyPublishHousingsAPI = async (activity=null) => {
    let where = activity ? `?activity=${activity}` : ''
    const {data} = await $apiAuth.get('/api/published_housings/my/'+where)
    return data
}