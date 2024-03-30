import {$apiAuth} from "../../../http/instance.js";


export const postImageAPI = async (image) => {
    const {data} = await $apiAuth.post('/api/images/', image)
    return data
}

export const deleteImageAPI = async (image_id) => {
    const {data} = await $apiAuth.delete(`/api/images/${image_id}/` )
    return data
}