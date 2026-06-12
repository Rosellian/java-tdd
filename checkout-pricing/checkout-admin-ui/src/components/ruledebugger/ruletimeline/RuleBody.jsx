import {useTheme} from "../../../ui/ThemeProvider";

export function RuleBody({ rule }) {
    const { theme } = useTheme();

    return (
        <div style={styles.ruleBody}>
            <div style={{
                ...styles.ruleValue,
                ...(theme === "dark" ? styles.valueDark : styles.valueLight)
            }}>Before: {rule.before}</div>
            <div style={{
                ...styles.ruleValue,
                ...(theme === "dark" ? styles.valueDark : styles.valueLight)
            }}>After: {rule.after}</div>
            <div style={{
                ...styles.ruleEffect,
                ...(theme === "dark" ? styles.effectDark : styles.effectLight)
            }}>{rule.delta}</div>
        </div>
    )
}

const styles = {
    ruleBody: {
        marginTop: 8,
        paddingLeft: 4,
    },
    ruleValue: {
        fontSize: "0.85rem",
        marginTop: 4,
        transition: "color 0.25s ease",
    },
    valueDark: {
        color: "#bbb",
    },
    valueLight: {
        color: "#555",
    },
    ruleEffect: {
        marginTop: 4,
        fontSize: "0.85rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    effectDark: {
        color: "#4caf50",
    },
    effectLight: {
        color: "#2e7d32",
    }
}