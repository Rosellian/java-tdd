import {useEffect, useState} from "react";
import {useTheme} from "../../theme/ThemeProvider";
import {applyChange, stringify} from "./funcs";

export function JsonEditor({ value, originalValue, schema, onChange }) {
    const { theme } = useTheme();

    const [text, setText] = useState(stringify(value));
    const [error, setError] = useState(null);

    const changed = JSON.stringify(value) !== JSON.stringify(originalValue);

    useEffect(() => {
        setText(stringify(value));
    }, [value]);

    const handleChange = (e) => {
        applyChange(e, setText, schema, setError, onChange);
    }

    return (
        <div style={styles.container}>
            <textarea value={text} onChange={handleChange}
                style={{
                    ...styles.jsonInput,
                    ...(theme === "dark" ? styles.jsonInputDark : styles.jsonInputLight),
                    borderColor: error ? "#ff4444" : changed ? "#FFB300" : undefined
                }}/>

            {error && (
                <div style={styles.error}>
                    {error}
                </div>
            )}
        </div>
    )
}

const styles = {
    container: {
        marginBottom: 10
    },
    jsonInput: {
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        minHeight: 140,
        marginTop: 10,
        padding: "8px",
        borderRadius: 4,
        border: "1px solid",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowY: "auto",
        overflowX: "hidden",
        resize: "none",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease"
    },
    jsonInputDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444"
    },
    jsonInputLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc"
    },
    error: {
        color: "#ff4444",
        fontSize: "0.8rem",
        marginTop: 4
    }
}