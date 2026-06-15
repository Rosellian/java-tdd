import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {detailsStyles} from "./detailsStyles";

export function DPDetail({ label, value }) {
    const { theme } = useTheme();

    return (
        <div style={detailsStyles.dpDetailsRow}>
            <span style={{
                ...detailsStyles.dpLabel,
                ...(theme === "dark" ? detailsStyles.labelDark : detailsStyles.labelLight)
            }}>{label}:</span>
            <span style={{
                ...styles.dpValue,
                ...(theme === "dark" ? styles.valueDark : styles.valueLight)
            }}>{value}</span>
        </div>
    )
}

const styles = {
    dpValue: {
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    valueDark: {
        color: "#4caf50",
    },
    valueLight: {
        color: "#2e7d32",
    }
}