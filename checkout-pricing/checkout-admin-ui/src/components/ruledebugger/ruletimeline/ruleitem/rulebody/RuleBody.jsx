import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {RuleValue} from "./RuleValue";

export function RuleBody({ rule }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let effectColor = getEffectColor(rule.before, rule.after, isDark);

    return (
        <div style={styles.ruleBody}>
            <RuleValue label="Before" value={rule.before} />
            <RuleValue label="After" value={rule.after} />

            <div style={{
                ...styles.ruleEffect,
                ...({color: effectColor})
            }}>
                {rule.delta}
            </div>
        </div>
    )
}

function getEffectColor(before, after, isDark) {
    if (after < before) return isDark ? "#4caf50" : "#2e7d32";

    if (after > before) return "#d32f2f";

    return "#f9a825";
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
    }
}