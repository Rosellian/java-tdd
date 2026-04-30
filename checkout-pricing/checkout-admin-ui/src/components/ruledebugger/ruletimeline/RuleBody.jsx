export function RuleBody({ rule }) {
    return (
        <div style={styles.ruleBody}>
            <div style={styles.ruleValue}>Before: {rule.before}</div>
            <div style={styles.ruleValue}>After: {rule.after}</div>
            <div style={styles.ruleEffect}>{rule.delta}</div>
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
        color: "#bbb",
        marginTop: 4,
    },
    ruleEffect: {
        marginTop: 4,
        fontSize: "0.85rem",
        color: "#4caf50",
    }
}