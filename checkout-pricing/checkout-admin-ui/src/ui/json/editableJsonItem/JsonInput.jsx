import {useTheme} from "../../theme/ThemeProvider";

export function JsonInput({ value, onChange, changed, error }) {
    const { theme } = useTheme();

    return (
        <>
            <textarea value={value} onChange={onChange}
                      style={{
                          ...styles.textarea,
                          ...(theme === "dark" ? styles.textareaDark : styles.textareaLight),
                          borderColor: error ? "#ff4444" : changed ? "#FFB300" : undefined}}
            />

            {error && (
                <div style={styles.error}>
                    {error}
                </div>
            )}
        </>
    )
}

const styles = {
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
    error: {
        color: "#ff4444",
        fontSize: "0.8rem",
        marginTop: 4
    }
}