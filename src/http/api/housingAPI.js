import {$apiAuth} from "../instance.js";


export const getHousingById = async (id) => {
    const {data} = await $apiAuth.get('/api/housings/'+id)
    return data
}

export const updateHousingAPI = async (id, updatedHousing) => {
    const {data} = await $apiAuth.put(`/api/housings/${id}/`, updatedHousing)
    return data
}