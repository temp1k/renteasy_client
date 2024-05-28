import {$apiAuth} from "../instance.js";

export const getProfileRequestsAPI = async () => {
    const {data} = await $apiAuth.get('/api/buy_requests/get_user_requests')
    return data
}

export const getProfileRequestAPI = async (id) => {
    const {data} = await $apiAuth.get(`/api/buy_requests/${id}/full`)
    return data
}


export const getLandlordRequestsAPI = async (params={}) => {
    const {data} = await $apiAuth.get('/api/buy_requests/get_owner_requests', {params})
    return data
}

export const getLandlordRequestAPI = async (id) => {
    const {data} = await $apiAuth.get(`/api/buy_requests/${id}/full`)
    return data
}

export const putActiveLandlordRequestAPI = async (id, data) => {
    const {result} = await $apiAuth.put(`/api/buy_requests/${id}/change_active_landlord/`, data)
    return result
}