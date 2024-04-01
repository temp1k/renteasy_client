import {$api} from "../../../http/instance.js";

export const getPublishHousingAPI = async () => {
    const {data} = await $api.get('api/published_housings/?activity=True');
    return data;
}