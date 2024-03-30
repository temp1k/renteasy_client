import {$api} from "../../../../http/instance.js";


export const getCategoriesWithSearchAPI = async (name='') => {
    const where = name ? `?name=${name}` : ''
    const {data} = await $api.get('api/categories'+where)
    return data
}