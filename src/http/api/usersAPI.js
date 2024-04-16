import {$apiAuth} from "../instance.js";


export const getUserById = async (id) => {
    const {data} = await $apiAuth.get('/api/users/'+id)
    return data
}