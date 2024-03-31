import {$apiAuth} from "../instance.js";

export const createPublishHousingAPI = async (publish_housing) => {
    const {data} = await $apiAuth.post('/api/published_housings/', publish_housing)
    return data
}