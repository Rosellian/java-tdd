import {useTheme} from "../../../ui/theme/ThemeProvider";

export function ChangesView({ ruleset, originalRuleset }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <div style={styles.header}>
                Changes:
            </div>
            {diffRulesets(originalRuleset, ruleset).map((d, i) => (
                <div key={i} style={styles.diff}>
                    • {d}
                </div>
            ))}
        </div>
    )
}

function diffRulesets(a, b) {
    if (!a || !b) return [];

    let diffs = [];

    if (a.name !== b.name) diffs.push("Name changed");

    let max = Math.max(a.rules.length, b.rules.length);
    for (let i = 0; i < max; i++) {
        //TODO implement rule comparison
    }

    return diffs;
}

const styles = {
    container: {
        marginTop: 10,
        padding: "8px 12px",
        borderRadius: 4,
        fontSize: 13
    },
    containerDark: {
        background: "#263238"
    },
    containerLight: {
        background: "#ECEFF1"
    },
    header: {
        fontWeight: 600,
        marginBottom: 4
    },
    diff: {
        marginLeft: 8
    }
}