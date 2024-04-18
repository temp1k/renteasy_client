import {$api} from "../../../http/instance.js";

export const getPublishHousingAPI = async (params = {}) => {
    const {data} = await $api.get('api/published_housings/?activity=True', {params});
    return data;
}