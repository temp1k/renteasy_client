import {useEffect, useState} from "react";
import {getRequestsAPI} from "../scences/Moderator/api/requestsAPI.js";
import {AWAIT_REQUEST_STATUS} from "../utils/consts/statuses.js";
import {getErrorText} from "../utils/helpers.js";

const useDataAPI = (limit, params, requestAPI) => {
    const [data, setData] = useState([])
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const updateData = () => {
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
    }, [offset, params.search]);


    return {
        data, updateData,
        error,
        loading, setLoading,
        count,
        offset, setOffset
    }
}

export default useDataAPI