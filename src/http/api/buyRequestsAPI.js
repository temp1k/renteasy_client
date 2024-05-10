import {$apiAuth} from "../instance.js";

export const getProfileRequestsAPI = async () => {
    const {data} = await $apiAuth.get('/api/buy_requests/get_user_requests')
    return data
}