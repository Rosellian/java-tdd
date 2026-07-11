export function JsonValue({ value }) {
    if (value === null) return <span className="json-null">null</span>;

    if (typeof value === "string") return <span className="json-string">"{value}"</span>;

    if (typeof value === "number") {
        const clean = Number(value.toFixed(10));
        const trimmed = parseFloat(clean.toString());

        return <span className="json-number">{trimmed}</span>;
    }

    if (typeof value === "boolean") return <span className="json-boolean">{String(value)}</span>;

    return <span>{String(value)}</span>;
}