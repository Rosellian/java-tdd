import {useTheme} from "../../../ui/ThemeProvider";

export function EventBody({ event }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.eventBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <pre style={{
                ...styles.pre,
                ...(theme === "dark" ? styles.preDark : styles.preLight)
            }}>Delta: {JSON.stringify(event.delta, null, 2)}</pre>
            <pre style={{
                ...styles.pre,
                ...(theme === "dark" ? styles.preDark : styles.preLight)
            }}>Before: {JSON.stringify(event.before, null, 2)}</pre>
            <pre style={{
                ...styles.pre,
                ...(theme === "dark" ? styles.preDark : styles.preLight)
            }}>After: {JSON.stringify(event.after, null, 2)}</pre>
        </div>
    )
}

const styles = {
    eventBody: {
        padding: 10,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee",
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222",
    },
    pre: {
        margin: "6px 0",
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        border: "1px solid #333",
    },
    preLight: {
        background: "#f5f5f5",
        color: "#333",
        border: "1px solid #ddd",
    }
}