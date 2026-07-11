export function generateSchema(value) {
    if (value === null) return "null";

    const type = typeof value;

    // Primitives
    if (type === "string") return "string";
    if (type === "number") return "number";
    if (type === "boolean") return "boolean";

    // Arrays
    if (Array.isArray(value)) {
        if (value.length === 0) return ["any"];
        return [generateSchema(value[0])];
    }

    // Objects
    if (type === "object") {
        const schema = {};
        for (const key of Object.keys(value)) {
            schema[key] = generateSchema(value[key]);
        }
        return schema;
    }

    return "any";
}