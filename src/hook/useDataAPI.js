import {useEffect, useState} from "react";
import {getRequestsAPI} from "../scences/Moderator/api/requestsAPI.js";
import {AWAIT_REQUEST_STATUS} from "../utils/consts/statuses.js";
import {getErrorText} from "../utils/helpers.js";

const useDataAPI = (options) => {
    const {limit, requestAPI, params} = options
    const [data, setData] = useState([])
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const updateData = () => {
        setData([])
        requestAPI({limit: limit, offset: offset, ...params})
            .then(d => {
                setData(d.results)
                setCount(d.count)
                console.log(d)
            })
            .catch(err => {
                const errorText = getErrorText(err)
                setError(errorText)
                console.error(err)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        updateData()
    }, [offset]);


    return {
        data, updateData,
        error,
        loading,
        count,
        offset, setOffset
    }
}

export default useDataAPI