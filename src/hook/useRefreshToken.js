import {$api} from '../http/instance.js'

    export default function useRefreshToken () {

    const refresh = async () => {
        const response = await $api.post('api/token/refresh', {
            withCredentials: true
        })

        console.log(response.data)

        return response.data.access
    }

    return {
        refresh
    }
}