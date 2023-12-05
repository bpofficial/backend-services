export function isUrl(url: string) {
    try {
        return !!new URL(url);
    } catch (_) {
        return false;
    }
}
