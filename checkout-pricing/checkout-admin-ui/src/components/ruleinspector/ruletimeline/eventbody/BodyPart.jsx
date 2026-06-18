import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {CollapsibleJsonView} from "../../../../ui/json/collapsible/CollapsibleJsonView";
import {normalizeNumbers} from "../../../../ui/json/collapsible/funcs";

export function BodyPart({ label, value }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const normalizedValue = normalizeNumbers(value);

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

            <CollapsibleJsonView value={normalizedValue} />
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