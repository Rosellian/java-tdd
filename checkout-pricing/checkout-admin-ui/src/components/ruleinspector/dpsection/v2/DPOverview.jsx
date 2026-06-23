import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function DPOverview({ dp }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const rules = dp.rules ?? [];

    return (
        <div style={{
            ...styles.overview,
            ...(isDark ? styles.overviewDark : styles.overviewLight)
        }}>
            <div><strong>SKU:</strong> {dp.sku}</div>
            <div><strong>Unit price:</strong> {dp.unitPrice}</div>
            <div><strong>Remaining:</strong> {dp.remaining}</div>
            <div><strong>Steps:</strong> {dp.nodes.length}</div>
            <div style={styles.rules}>
                <strong>Rules affecting DP:</strong>
                {rules.map(rule => rule.name).join(", ")}
            </div>
            <div><strong>Final Price:</strong> {dp.finalPrice}</div>
        </div>
    )
}

const styles = {
    overview: {
        padding: 10,
        borderRadius: 6,
        border: "1px solid"
    },
    overviewDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee"
    },
    overviewLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    rules: {
        display: "flex",
        flexDirection: "column",
    }
}