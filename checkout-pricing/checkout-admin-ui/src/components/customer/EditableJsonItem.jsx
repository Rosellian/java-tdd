import {useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {AnimatedBody} from "../../ui/AnimatedBody";

export function EditableJsonItem({ label, value, originalValue, schema, onChange, isPrimitive }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(
        isPrimitive ? String(value) : JSON.stringify(value, null, 2));
    const [error, setError] = useState(null);

    const changed = JSON.stringify(value) !== JSON.stringify(originalValue);

    function validateSchema(obj, schema) {
        if (!schema) return true;
        if (typeof schema === "string") return typeof obj === schema;
        if (Array.isArray(schema)) return Array.isArray(obj);
        if (typeof schema === "object") {
            if (typeof obj !== "object" || obj === null) return false;
            return Object.keys(schema).every(k => validateSchema(obj[k], schema[k]));
        }
        return true;
    }

    function handleChange(e) {
        const newText = e.target.value;
        setText(newText);

        if (isPrimitive) {
            onChange(newText);
            return;
        }

        try {
            const parsed = JSON.parse(newText);

            if (!validateSchema(parsed, schema)) {
                setError("JSON does not match schema");
                return;
            }

            setError(null);
            onChange(parsed);

        } catch {
            setError("Invalid JSON");
        }
    }

    return (
        <div style={{ marginBottom: 10 }}>
            <div
                onClick={() => setOpen(!open)}
                style={{
                    ...styles.header,
                    ...(theme === "dark" ? styles.headerDark : styles.headerLight),
                    borderLeft: changed ? "4px solid #FFB300" : "4px solid transparent",
                    cursor: "pointer"
                }}
            >
                <span>{label}</span>
                <span style={{ opacity: 0.8 }}>{open ? "▼" : "▶"}</span>
            </div>

            <AnimatedBody open={open}>
                {isPrimitive ? (
                    <input
                        value={text}
                        onChange={handleChange}
                        style={{
                            ...styles.input,
                            ...(theme === "dark" ? styles.inputDark : styles.inputLight),
                            borderColor: changed ? "#FFB300" : undefined
                        }}
                    />
                ) : (
                    <>
                        <textarea
                            value={text}
                            onChange={handleChange}
                            style={{
                                ...styles.textarea,
                                ...(theme === "dark" ? styles.textareaDark : styles.textareaLight),
                                borderColor: error ? "#ff4444" : changed ? "#FFB300" : undefined
                            }}
                        />
                        {error && (
                            <div style={{ color: "#ff4444", fontSize: "0.8rem", marginTop: 4 }}>
                                {error}
                            </div>
                        )}
                    </>
                )}
            </AnimatedBody>
        </div>
    )
}

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 4px",
        borderRadius: 4,
        fontWeight: 600,
        transition: "background 0.25s ease",
    },
    headerDark: {
        background: "#2A2A2A",
        color: "#BB86FC",
    },
    headerLight: {
        background: "#eaeaea",
        color: "#5A2DA8",
    },
    textarea: {
        width: "100%",
        maxWidth: "100%",
        minHeight: 140,
        padding: 8,
        borderRadius: 4,
        border: "1px solid",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowY: "auto",
        overflowX: "hidden",
        resize: "none",
    },
    textareaDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444",
    },
    textareaLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc",
    },
    input: {
        width: "100%",
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid",
        fontSize: "0.9rem",
    },
    inputDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444",
    },
    inputLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc",
    }
}