import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function CartTooltip({ cart }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.tooltip,
            ...(theme === "dark" ? styles.tooltipDark : styles.tooltipLight)
        }}>
            <pre  style={{
                ...styles.tooltipPre,
                ...(theme === "dark" ? styles.tooltipPreDark : styles.tooltipPreLight)
            }}>
                {JSON.stringify(cart, null, 2)}
            </pre>
        </div>
    )
}

const styles = {
    tooltip: {
        position: "absolute",
        left: "105%",
        top: 0,
        padding: 10,
        borderRadius: 4,
        whiteSpace: "pre",
        zIndex: 20,
        minWidth: 200,
        border: "1px solid",
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
    },
    tooltipDark: {
        background: "#2A2A2A",
        borderColor: "#444",
    },
    tooltipLight: {
        background: "#ffffff",
        borderColor: "#ccc",
    },
    tooltipPre: {
        margin: 0,
        fontSize: "0.8rem",
        transition: "color 0.2s ease",
    },
    tooltipPreDark: {
        color: "#BB86FC",
    },
    tooltipPreLight: {
        color: "#5A2DA8",
    }
}