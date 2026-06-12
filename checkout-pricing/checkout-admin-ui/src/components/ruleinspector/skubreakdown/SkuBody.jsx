import {useTheme} from "../../../ui/ThemeProvider";

export function SkuBody({ sku }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.skuBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <pre style={{
                ...styles.pre,
                ...(theme === "dark" ? styles.preDark : styles.preLight)
            }}>{JSON.stringify(sku, null, 2)}</pre>
        </div>
    )
}

const styles = {
    skuBody: {
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