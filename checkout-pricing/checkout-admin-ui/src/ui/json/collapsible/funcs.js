export function normalizeNumbers(obj) {
    if (typeof obj === "number") {
        return Number(obj.toString());
    }
    if (Array.isArray(obj)) {
        return obj.map(normalizeNumbers);
    }
    if (obj && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, normalizeNumbers(v)])
        );
    }
    return obj;
}