export function getLastFragmentFromUrl(url) {
    const parts = url.split('/');

    let fragment = parts[parts.length - 1]
    if (fragment.length > 20) fragment = '...'+fragment.slice(-20)

    return fragment;
}

export function remakeArrayOfObjectsToArrayId(objects) {
    return objects.map(obj => obj.id);
}

export function formatJsonDateTo_ddMMyyyy(jsonDate) {
    const date = new Date(jsonDate);
    // Форматируем дату в формат dd.mm.yyyy
    const formattedDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
    return formattedDate
}

export function formatJsonDateTo_HHmm(jsonDate) {
    const date = new Date(jsonDate);
    // Форматируем дату в формат dd.mm.yyyy
    const formattedTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + (date.getMinutes() + 1)).slice(-2);
    return formattedTime
}

export function formatJsonDateTo_ddMMyyyy_HHmm(jsonDate) {
    // Форматируем дату в формат dd.MM.yyyy HH:mm
    const timeStr = formatJsonDateTo_HHmm(jsonDate)
    const dateStr = formatJsonDateTo_ddMMyyyy(jsonDate)
    return dateStr + ' ' + timeStr
}

export function formatJsonDateToJsDate(jsonDate) {
    return new Date(jsonDate)
}

export function differenceDatesInDays(date1, date2) {
    const differenceInMs = date2.getTime() - date1.getTime();

    // Преобразуем разницу в дни
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    return differenceInDays
}

export function getErrorText(error) {
    if (error.response?.status) {
        const status = error.response.status
        switch(status) {
            case 404:
                return 'Упс... Ничего не найдено :('
            default:
                return 'Непредвиденная ошибка'
        }
    }
    return 'ERROR!!!';
}