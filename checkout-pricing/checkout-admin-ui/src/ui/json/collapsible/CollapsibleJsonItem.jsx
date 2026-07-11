import {CollapsibleJsonView} from "./CollapsibleJsonView";
import {useState} from "react";
import {JsonValue} from "./JsonValue";

export function CollapsibleJsonItem({ label, value, level }) {
    const [open, setOpen] = useState(false);
    const isObject = value && typeof value === "object";

    const cursor = isObject ? "pointer" : "default";

    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.item,
                    ...{cursor: cursor}
                }}
                onClick={() => isObject && setOpen(!open)}
            >
                {isObject && (
                    <span style={styles.toggle}>
                        {open ? "▼" : "▶"}
                    </span>
                )}

                <div style={styles.jsonValue}>
                    <span className="json-key">"{label}"</span>
                    <span>:</span>
                    {!isObject && <JsonValue value={value} />}
                </div>
            </div>

            {isObject && open && (
                <div style={styles.value}>
                    <CollapsibleJsonView value={value} level={level + 1} />
                </div>
            )}
        </div>
    )
}

const styles = {
    container: {
        marginBottom: 4
    },
    item: {
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: 6
    },
    toggle: {
        opacity: 0.7
    },
    jsonValue: {
        display: "flex",
        gap: 6,
        alignItems: "center"
    },
    value: {
        marginLeft: 16
    }
}