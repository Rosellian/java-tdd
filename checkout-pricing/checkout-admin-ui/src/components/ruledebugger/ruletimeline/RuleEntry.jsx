export function RuleEntry({ rule, onClick, open }) {
    return (
        <div style={styles.ruleHeader} onClick={onClick}>
            <span style={styles.ruleName}>{rule.name}</span>
            <span style={styles.ruleToggle}>{open ? "▲" : "▼"}</span>
        </div>
    )
}

const styles = {
    ruleHeader: {
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        userSelect: "none",
    },
    ruleName: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#BB86FC",
    },
    ruleToggle: {
        color: "#888",
        fontSize: "0.9rem",
    }
}