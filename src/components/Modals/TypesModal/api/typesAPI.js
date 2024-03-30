import {$api} from "../../../../http/instance.js";


export const getTypesWithSearch = async (name='') => {
    let where = name ? `?name=${name}` : ''

    const {data} = await $api.get('api/types'+where)

    return data
}