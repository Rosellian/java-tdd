import {useTheme} from "../../../../ui/ThemeProvider";

export function PriceTooltip({ prices, hoverIndex }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.tooltip,
            ...(theme === "dark" ? styles.tooltipDark : styles.tooltipLight)
        }}>
            Step {hoverIndex + 1}: {prices[hoverIndex]}
        </div>
    )
}

const styles = {
    tooltip: {
        marginTop: 10,
        padding: "6px 10px",
        borderRadius: 4,
        fontSize: "0.85rem",
        display: "inline-block",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
        border: "1px solid",
    },
    tooltipDark: {
        background: "#333",
        borderColor: "#555",
        color: "#fff",
    },
    tooltipLight: {
        background: "#f0f0f0",
        borderColor: "#ccc",
        color: "#222",
    }
}