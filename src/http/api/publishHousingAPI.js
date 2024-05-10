import {$api, $apiAuth} from "../instance.js";

export const createPublishHousingAPI = async (publish_housing) => {
    const {data} = await $apiAuth.post('/api/published_housings/', publish_housing)
    return data
}

export const updatePublishHousingAPI = async (id, publishHousing) => {
    const {data} = await $apiAuth.put(`/api/published_housings/${id}/`, publishHousing)
    return data
}

export const getMyPublishHousingsAPI = async (activity=null, params={}) => {
    let where = activity ? `?activity=${activity}` : ''
    const {data} = await $apiAuth.get('/api/published_housings/my/'+where, {params})
    return data
}

export const getPublishHousingByIdAPI = async (id) => {
    const {data} = await $api.get('/api/published_housings/'+id)
    return data
}


export const checkBuyProductAPI = async (product=0) => {
    const {data} = await $apiAuth.post('/api/published_housings/is_buy/', {product})
    return data
}


export const getAnyHousingByIdAPI = async (id) => {
    const {data} = await $apiAuth.get('/api/published_housings/'+id)
    return data
}

export const changeStatusPublihsHousingAPI = async (id, status, message=null) => {
    const {data} = await $apiAuth.put(`/api/published_housings/${id}/request/`, {status, message})
    return data;
}

export const postBuyRequestAPI = async (request) => {
    const {data} = await $apiAuth.post('/api/buy_requests/', request)
    return data
}