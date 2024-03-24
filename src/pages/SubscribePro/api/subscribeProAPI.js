import {$apiAuth} from "../../../http/instance.js";


export const subscribeProAPI = async () => {
    const {data} = await $apiAuth.post('api/users/subscribe_pro/')
    return data
}