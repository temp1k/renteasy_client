import {$apiAuth} from "../instance.js";


export const getUserById = async (id) => {
    const {data} = await $apiAuth.get('/api/users/'+id)
    return data
}

export const blockUserAPI = async (id, block) => {
    const {data} = await $apiAuth.put(`/api/users/${id}/block/`, {block})
    return data
}