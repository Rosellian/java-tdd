export function validateSchema(value, schema) {
    if (typeof schema === "string") {
        return typeof value === schema;
    }

    if (Array.isArray(schema)) {
        return Array.isArray(value);
    }

    if (typeof schema === "object") {
        if (typeof value !== "object" || value === null) return false;
        for (const key of Object.keys(schema)) {
            if (!validateSchema(value[key], schema[key])) return false;
        }
        return true;
    }

    return false;
}