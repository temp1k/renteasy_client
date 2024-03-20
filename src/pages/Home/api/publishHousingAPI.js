import {$api} from "../../../http/index.js";

export const getPublishHousingAPI = async () => {
    const {data} = await $api.get('api/published_housings/');
    return data;
}