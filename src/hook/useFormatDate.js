import {useEffect, useState} from "react";


export default function useFormatDate(date) {
    const [formatDate, setFormatDate] = useState('')
    function changeDate(date) {
        const day = String(date?.getDate()).padStart(2, '0');
        const month = String(date?.getMonth() + 1).padStart(2, '0');
        const year = date?.getFullYear();

        if (!day || !month || !year) return '__.__.____'

        return `${day}.${month}.${year}`;
    }

    useEffect(() => {
        setFormatDate(changeDate(date))
    }, [date]);
    
    return formatDate
}