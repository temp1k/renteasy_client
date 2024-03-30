export function getLastFragmentFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}