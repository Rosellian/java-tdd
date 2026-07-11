import {useTheme} from "../../../ui/theme/ThemeProvider";
import {SkuBox} from "./SkuBox";
import {InfoRows} from "./InfoRows";

export function RulePreview({ ruleset }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    if (!ruleset) return null;

    let rules = ruleset.rules;

    return (
        <div style={{
            ...styles.wrapper,
            ...(isDark ? styles.dark : styles.light)
        }}>
            <h3 style={styles.title}>Rules Overview</h3>

            <div style={styles.grid}>
                <div style={styles.leftCol}>
                    <InfoRows rules={rules} />
                </div>

                <div style={styles.rightCol}>
                    <SkuBox rules={rules}/>
                </div>
            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        padding: 12,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "background 0.3s ease"
    },
    dark: {
        background: "#1f1f1f",
        color: "#e0e0e0",
        border: "1px solid #333"
    },
    light: {
        background: "#fafafa",
        color: "#333",
        border: "1px solid #ddd"
    },
    title: {
        margin: 0,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 600,
        color: "#BB86FC"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        alignItems: "start"
    },
    leftCol: {
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    rightCol: {
        display: "flex",
        flexDirection: "column"
    }
}