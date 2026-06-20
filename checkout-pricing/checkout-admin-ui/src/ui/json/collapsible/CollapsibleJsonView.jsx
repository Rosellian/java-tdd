import {CollapsibleJsonItem} from "./CollapsibleJsonItem";
import {JsonValue} from "./JsonValue";

export function CollapsibleJsonView({ value, level = 0 }) {
    if (value === null || typeof value !== "object") {
        return <JsonValue value={value} />;
    }

    const margin = level === 0 ? 0 : 12;

    const isArray = Array.isArray(value);
    const entries = isArray ? value.map((v, i) => [i, v]) : Object.entries(value);

    return (
        <div style={{ marginLeft: margin }}>
            {entries.map(([key, val]) => (
                <CollapsibleJsonItem
                    key={key}
                    label={key}
                    value={val}
                    level={level + 1}
                />
            ))}
        </div>
    )
}