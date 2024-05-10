import {$apiAuth} from "../../../http/instance.js";

export const getAllUsersAPI = async (params) => {
    const {data} = await $apiAuth.get('api/users', {params})
    return data
}

export const getStatisticsAPI = async () => {
    const {data} = await $apiAuth.get('api/districts/statistics')
    return data
}