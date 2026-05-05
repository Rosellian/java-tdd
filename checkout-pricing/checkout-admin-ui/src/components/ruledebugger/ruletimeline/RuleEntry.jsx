export function RuleEntry({ rule, onClick, open }) {
    return (
        <div style={styles.ruleHeader} onClick={onClick}>
            <span style={styles.ruleName}>{rule.name}</span>
            <StatusMark matched={rule.matched} />
            <span style={styles.ruleToggle}>{open ? "▲" : "▼"}</span>
        </div>
    )
}

function StatusMark({matched}) {
    return (
        <span style={{ color: matched ? "#7CFC7C" : "#FF6B6B" }}>
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