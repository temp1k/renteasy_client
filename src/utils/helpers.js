export function getLastFragmentFromUrl(url) {
    const parts = url.split('/');

    let fragment = parts[parts.length - 1]
    if (fragment.length > 20) fragment = '...'+fragment.slice(-20)

    return fragment;
}

export function remakeArrayOfObjectsToArrayId(objects) {
    return objects.map(obj => obj.id);
}