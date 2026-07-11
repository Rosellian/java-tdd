import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {lineWrapOnPlus} from "../../../../functions/dp/formatting";
import {DPOptions} from "./DPOptions";
import {DPDetailRow} from "./DPDetailRow";

export function DPDetailsV2({ node, index }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

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

            <DPDetailRow label="State" value={node.state} />

            <DPDetailRow label="Chosen" value={lineWrapOnPlus(node.chosen)} valueStyle={styles.badge}
                         valueColor={isDark ? styles.badgeDark : styles.badgeLight} />

            <DPDetailRow label="Price" value={node.price} />

            <DPOptions node={node} isDark={isDark}/>
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
    }
}