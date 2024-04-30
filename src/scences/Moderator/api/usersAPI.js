import {$apiAuth} from "../../../http/instance.js";

export const getAllUsersAPI = async (params) => {
    const {data} = await $apiAuth.get('api/users', {params})
    return data
}