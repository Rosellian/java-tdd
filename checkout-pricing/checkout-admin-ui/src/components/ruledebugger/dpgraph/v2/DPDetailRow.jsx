import {detailsStyles} from "./detailsStyles";
import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function DPDetailRow({ label, value, valueStyle = styles.value,
                         valueColor = null }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    let color = isDark ? styles.valueDark : styles.valueLight;
    if (valueColor) {
        color = valueColor;
    }

    return (
        <div style={detailsStyles.row}>
            <span style={detailsStyles.label}>{label}</span>

            <span style={{
                ...valueStyle,
                ...color
            }}>
                {value}
            </span>
        </div>
    )
}

const styles = {
    value: {
        fontWeight: 600,
        wordBreak: "break-word"
    },
    valueDark: {
        color: "#4caf50"
    },
    valueLight: {
        color: "#2e7d32"
    }
}