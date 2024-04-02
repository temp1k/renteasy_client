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

export function formatJsonDateToJsDate(jsonDate) {
    return new Date(jsonDate)
}