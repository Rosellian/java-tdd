import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {formatChosen} from "../../../../functions/formatting";

export function DPDetailsV2({ node, index }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    let valueColor = isDark ? styles.valueDark : styles.valueLight;

    return (
        <div style={{
            ...styles.card,
            ...(isDark ? styles.cardDark : styles.cardLight)
        }}>
            <div style={{
                ...styles.header,
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}>
                Step {index + 1}
            </div>

            <div style={styles.row}>
                <span style={styles.label}>State</span>

                <span style={{
                    ...styles.value,
                    ...valueColor
                }}>
                    {node.state}
                </span>
            </div>

            <div style={styles.row}>
                <span style={styles.label}>Chosen</span>

                <span style={{
                    ...styles.badge,
                    ...(isDark ? styles.badgeDark : styles.badgeLight)
                }}>
                    {formatChosen(node.chosen)}
                </span>
            </div>

            <div style={styles.row}>
                <span style={styles.label}>Price</span>

                <span style={{
                    ...styles.value,
                    ...valueColor
                }}>
                    {node.price}
                </span>
            </div>

            <div style={styles.row}>
                <span style={styles.label}>Options</span>

                <div style={styles.tagList}>
                    {(node.options?.length > 0 ? node.options : ["None"]).map((opt, i) => (
                        <span key={i} style={{
                            ...styles.tag,
                            ...(isDark ? styles.tagDark : styles.tagLight)
                        }}>
                            {opt}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

const styles = {
    card: {
        padding: 12,
        borderRadius: 6,
        border: "1px solid",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        minWidth: 260,
        fontSize: "0.85rem",
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    cardDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee"
    },
    cardLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    header: {
        fontWeight: 600,
        fontSize: "1rem",
        marginBottom: 4
    },
    headerDark: {
        color: "#BB86FC"
    },
    headerLight: {
        color: "#5A2DA8"
    },
    row: {
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        alignItems: "start",
        gap: 6
    },
    label: {
        opacity: 0.75,
        fontWeight: 500
    },
    value: {
        fontWeight: 600,
        wordBreak: "break-word"
    },
    valueDark: {
        color: "#4caf50"
    },
    valueLight: {
        color: "#2e7d32"
    },
    badge: {
        padding: "2px 6px",
        borderRadius: 4,
        fontWeight: 600,
        maxWidth: "100%",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word"
    },
    badgeDark: {
        background: "#2A2A2A",
        border: "1px solid #444",
        color: "#4caf50"
    },
    badgeLight: {
        background: "#f5f0ff",
        border: "1px solid #d6c6ff",
        color: "#2e7d32"
    },
    tagList: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
    },
    tag: {
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: "0.75rem",
        border: "1px solid"
    },
    tagDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#ccc"
    },
    tagLight: {
        background: "#f5f5f5",
        borderColor: "#ccc",
        color: "#333"
    }
}