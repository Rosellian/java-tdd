import {useTheme} from "../../../ui/ThemeProvider";

export function RuleEntry({ rule, onClick, open }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.ruleHeader,
            ...(theme === "dark" ? styles.headerDark : styles.headerLight)
        }} onClick={onClick}>
            <span style={{
                ...styles.ruleName,
                ...(theme === "dark" ? styles.nameDark : styles.nameLight)
            }}>{rule.name}</span>
            <StatusMark matched={rule.matched} />
            <span style={{
                ...styles.ruleToggle,
                ...(theme === "dark" ? styles.toggleDark : styles.toggleLight)
            }}>{open ? "▲" : "▼"}</span>
        </div>
    )
}

function StatusMark({matched}) {
    const { theme } = useTheme();

    const color = matched ?
        theme === "dark" ? "#7CFC7C" : "#2e7d32"
        : theme === "dark" ? "#FF6B6B" : "#d32f2f";

    return (
        <span style={{ color, fontWeight: 500, transition: "color 0.25s ease" }}>
            {matched ? "✔ Applied" : "✖ Skipped"}
        </span>
    )
}

const styles = {
    ruleHeader: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        alignItems: "center",
        columnGap: 12,
        cursor: "pointer",
        userSelect: "none",
        padding: "4px 0",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    headerDark: {
        background: "transparent",
        color: "#eee",
    },
    headerLight: {
        background: "transparent",
        color: "#222",
    },
    ruleName: {
        fontSize: "1rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    nameDark: {
        color: "#BB86FC",
    },
    nameLight: {
        color: "#5A2DA8",
    },
    ruleToggle: {
        fontSize: "0.9rem",
        transition: "color 0.25s ease",
    },
    toggleDark: {
        color: "#888",
    },
    toggleLight: {
        color: "#666",
    }
}