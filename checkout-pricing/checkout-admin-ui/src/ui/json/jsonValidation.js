export function validateSchema(obj, schema) {
    if (!schema) return true;
    if (typeof schema === "string") return typeof obj === schema;
    if (Array.isArray(schema)) return Array.isArray(obj);
    if (typeof schema === "object") {
        if (typeof obj !== "object" || obj === null) return false;
        return Object.keys(schema).every(k => validateSchema(obj[k], schema[k]));
    }
    return true;
}

export function validateSchemaV2(value, schema) {
    if (typeof schema === "string") {
        return typeof value === schema;
    }

    if (Array.isArray(schema)) {
        return Array.isArray(value);
    }

    if (typeof schema === "object") {
        if (typeof value !== "object" || value === null) return false;
        for (const key of Object.keys(schema)) {
            if (!validateSchemaV2(value[key], schema[key])) return false;
        }
        return true;
    }

    return false;
}