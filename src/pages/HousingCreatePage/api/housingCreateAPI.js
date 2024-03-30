import {$apiAuth} from "../../../http/instance.js";

export const createHousingAPI = async (housing) => {
    const {data} = $apiAuth.post('api/housings/', housing)
    return data;
}