export function RuleBody({ rule }) {
    return (
        <div style={styles.ruleBody}>
            <div style={styles.ruleDesc}>{rule.description}</div>
            <div style={styles.ruleEffect}>{rule.delta}</div>
        </div>
    )
}

const styles = {
    ruleBody: {
        marginTop: 8,
        paddingLeft: 4,
    },
    ruleDesc: {
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