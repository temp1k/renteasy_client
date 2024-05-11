import {$apiAuth} from "../../../http/instance.js";


export const backupAPI = async (values) => {
    const {data} = await $apiAuth.post('api/backup/', values)
    return data
}

export const restoreAPI = async () => {
    const {data} = await $apiAuth.post('api/backup/restore/')
    return data
}