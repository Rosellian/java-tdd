import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {highlightJsonSafe} from "../../../../../ui/json/highlighting/highlight";

export function SkuData({ skuData }) {
    const { theme } = useTheme();

    return (
        <pre
            style={{
                ...styles.pre,
                ...(theme === "dark" ? styles.preDark : styles.preLight)
            }}>
            {highlightJsonSafe(skuData)}
        </pre>
    )
}

const styles = {
    pre: {
        margin: 0,
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        transition: "background 0.25s ease, color 0.25s ease",
        border: "1px solid",
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333",
    },
    preLight: {
        background: "#f5f5f5",
        color: "#333",
        borderColor: "#ddd",
    }
}