import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {StatusMark} from "./StatusMark";

export function RuleEntry({ rule, onClick, open }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.ruleHeader,
            ...(isDark ? styles.headerDark : styles.headerLight)
        }} onClick={onClick}>
            <span style={{
                ...styles.ruleName,
                ...(isDark ? styles.nameDark : styles.nameLight)
            }}>
                {rule.name}
            </span>

            <StatusMark matched={rule.matched} />

            <span style={{
                ...styles.ruleToggle,
                ...(isDark ? styles.toggleDark : styles.toggleLight)
            }}>
                {open ? "▲" : "▼"}
            </span>
        </div>
    )
}

const styles = {
    ruleHeader: {
        display: "grid",
        gridTemplateColumns: "minmax(200px, 1fr) auto auto",
        alignItems: "center",
        columnGap: 12,
        cursor: "pointer",
        userSelect: "none",
        padding: "4px 0",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    headerDark: {
        background: "transparent",
        color: "#eee"
    },
    headerLight: {
        background: "transparent",
        color: "#222"
    },
    ruleName: {
        fontSize: "1rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    nameDark: {
        color: "#BB86FC"
    },
    nameLight: {
        color: "#5A2DA8"
    },
    ruleToggle: {
        fontSize: "0.9rem",
        transition: "color 0.25s ease"
    },
    toggleDark: {
        color: "#888"
    },
    toggleLight: {
        color: "#666"
    }
}