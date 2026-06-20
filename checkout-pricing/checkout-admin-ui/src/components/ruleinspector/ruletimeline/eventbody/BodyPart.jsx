import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {highlightJsonSafe} from "../../../../ui/json/highlighting/highlight";

export function BodyPart({ label, value }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return(
        <div
            style={{
                ...styles.pre,
                ...(isDark ? styles.preDark : styles.preLight)
            }}
        >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
                {label}
            </div>

            {highlightJsonSafe(value)}
        </div>
    )
}

const styles = {
    pre: {
        margin: "6px 0",
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        border: "1px solid #333"
    },
    preLight: {
        background: "#f5f5f5",
        color: "#333",
        border: "1px solid #ddd"
    }
}