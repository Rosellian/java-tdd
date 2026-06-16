import {RuleItem} from "./ruleitem/RuleItem";
import {SkuRules} from "./SkuRules";
import {useTheme} from "../../../ui/theme/ThemeProvider";

export function RuleTimeline({ rules }) {
    const { theme } = useTheme()

    if (!rules) {
        return (
            <div style={{
                ...styles.timelineEmpty,
                ...(theme === "dark" ? styles.emptyDark : styles.emptyLight)
            }}>No rules matched in this step.</div>
        )
    }

    const globalRules = rules.filter(r => !r.sku);

    return (
        <div style={{
            ...styles.timelineWrapper,
            ...(theme === "dark" ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <h3 style={{
                ...styles.timelineHeader,
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>Rule Timeline</h3>

            <div style={styles.scrollSection}>
                <ul style={styles.timelineList}>
                    {globalRules.map((r, i) => (
                        <RuleItem key={i} rule={r} />
                    ))}

                    <SkuRules rules={rules} />
                </ul>
            </div>
        </div>
    )
}

const styles = {
    timelineWrapper: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.25s ease, color 0.25s ease"
    },
    wrapperDark: {
        background: "#1a1a1a",
        color: "#eee"
    },
    wrapperLight: {
        background: "#f5f5f5",
        color: "#222"
    },
    timelineHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    headerDark: {
        color: "#fff"
    },
    headerLight: {
        color: "#3A1F6B"
    },
    scrollSection: {
        maxHeight: 300,
        overflowY: "auto",
        paddingRight: 6
    },
    timelineList: {
        listStyle: "none",
        padding: 0,
        margin: 0
    },
    timelineEmpty: {
        padding: 16,
        borderRadius: 8,
        fontStyle: "italic",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    emptyDark: {
        background: "#1a1a1a",
        color: "#777"
    },
    emptyLight: {
        background: "#fafafa",
        color: "#666"
    }
}