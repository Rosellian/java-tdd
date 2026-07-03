import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {renderDiffLine, renderEmptyState} from "./viewFuncs";

export function PriceDiffView({ diffs }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (!diffs || diffs.length === 0) {
        return renderEmptyState();
    }

    return (
        <div style={isDark ? styles.wrapperDark : styles.wrapperLight}>
            <h3 style={styles.header}>Price List Changes</h3>

            <ul style={styles.list}>
                {diffs.map((d, i) => (
                    <li key={i} style={styles.item}>
                        {renderDiffLine(d)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

const styles = {
    wrapperLight: {
        padding: "10px 15px",
        background: "#f9f9f9",
        borderRadius: 6,
        border: "1px solid #ddd",
        marginTop: 10
    },
    wrapperDark: {
        padding: "10px 15px",
        background: "#2A2A2A",
        borderRadius: 6,
        border: "1px solid #444",
        marginTop: 10,
        color: "#E0E0E0"
    },
    header: {
        margin: "0 0 10px 0",
        fontSize: 16,
        fontWeight: "bold"
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0
    },
    item: {
        marginBottom: 6,
        fontSize: 14
    }
}