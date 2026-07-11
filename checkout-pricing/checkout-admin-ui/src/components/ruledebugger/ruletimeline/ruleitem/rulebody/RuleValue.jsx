import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function RuleValue({ label, value }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.ruleValue,
            ...(isDark ? styles.valueDark : styles.valueLight)
        }}>
            {label}: {value}
        </div>
    )
}

const styles = {
    ruleValue: {
        fontSize: "0.85rem",
        marginTop: 4,
        transition: "color 0.25s ease"
    },
    valueDark: {
        color: "#bbb"
    },
    valueLight: {
        color: "#555"
    }
}