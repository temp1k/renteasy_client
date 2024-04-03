import {$api, $apiAuth} from "../instance.js";


export const postFeedbackAPI = async (feedback) => {
    const {data} = await $apiAuth.post('/api/feedbacks/', feedback)
    return data;
}

export const getFeedbackByProductAPI = async (params = {}) => {
    const {data} = await $api.get('/api/feedbacks', {params})
    return data
}