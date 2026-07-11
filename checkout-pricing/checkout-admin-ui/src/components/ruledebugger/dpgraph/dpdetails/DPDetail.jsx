import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {detailsStyles} from "./detailsStyles";

export function DPDetail({ label, value, preFormatted = false }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={detailsStyles.dpDetailsRow}>
            <span style={{
                ...detailsStyles.dpLabel,
                ...(isDark ? detailsStyles.labelDark : detailsStyles.labelLight)
            }}>
                {label}:
            </span>

            <span style={{
                ...styles.dpValue,
                ...(isDark ? styles.valueDark : styles.valueLight),
                ...(preFormatted ? styles.preFormatted : {})
            }}>
                {value}
            </span>
        </div>
    )
}

const styles = {
    dpValue: {
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    valueDark: {
        color: "#4caf50"
    },
    valueLight: {
        color: "#2e7d32"
    },
    preFormatted: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word"
    }
}