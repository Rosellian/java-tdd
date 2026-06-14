import {AnimatedBody} from "../../ui/AnimatedBody";
import {useTheme} from "../../ui/ThemeProvider";
import {useState} from "react";

export function CollapsibleJsonItem({ label, value }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    const isPrimitive =
        typeof value !== "object" || value === null || Array.isArray(value) === false && typeof value !== "object";

    return (
        <div style={styles.jsonItem}>
            <div
                onClick={() => !isPrimitive && setOpen(!open)}
                style={{
                    ...styles.jsonHeader,
                    ...(theme === "dark" ? styles.jsonHeaderDark : styles.jsonHeaderLight),
                    cursor: isPrimitive ? "default" : "pointer"
                }}
            >
                <span>{label}</span>
                {!isPrimitive && (
                    <span style={{ opacity: 0.8 }}>{open ? "▼" : "▶"}</span>
                )}
            </div>

            {isPrimitive && (
                <div style={styles.primitiveValue}>
                    {String(value)}
                </div>
            )}

            {!isPrimitive && (
                <AnimatedBody open={open}>
                    <pre
                        style={{
                            ...styles.pre,
                            ...(theme === "dark" ? styles.preDark : styles.preLight)
                        }}
                    >
                        {JSON.stringify(value, null, 2)}
                    </pre>
                </AnimatedBody>
            )}
        </div>
    )
}

const styles = {
    jsonItem: {
        marginBottom: 10,
    },
    jsonHeader: {
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 4px",
        borderRadius: 4,
        fontWeight: 600,
        transition: "background 0.25s ease",
    },
    jsonHeaderDark: {
        background: "#2A2A2A",
        color: "#BB86FC",
    },
    jsonHeaderLight: {
        background: "#eaeaea",
        color: "#5A2DA8",
    },
    primitiveValue: {
        padding: "4px 6px",
        fontSize: "0.9rem",
        opacity: 0.9,
    },
    pre: {
        marginTop: 10,
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333",
    },
    preLight: {
        background: "#ffffff",
        color: "#333",
        borderColor: "#ddd",
    }
}