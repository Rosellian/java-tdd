import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {RuleValue} from "./RuleValue";

export function RuleBody({ rule }) {
    const { theme } = useTheme();

    return (
        <div style={styles.ruleBody}>
            <RuleValue label="Before" value={rule.before} />
            <RuleValue label="After" value={rule.after} />

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
        paddingLeft: 4
    },
    ruleEffect: {
        marginTop: 4,
        fontSize: "0.85rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    effectDark: {
        color: "#4caf50"
    },
    effectLight: {
        color: "#2e7d32"
    }
}