export function Rules({ rules }) {
    return (
        <div style={styles.rules}>
            <strong>Rules affecting DP:</strong>

            <div style={styles.ruleList}>
                {rules.map((rule, i) => (
                    <span
                        key={i}
                        title={JSON.stringify(rule.data, null, 2)}
                        style={styles.ruleItem}
                    >
                        {rule.name}{i < rules.length - 1 ? ", " : ""}
                    </span>
                ))}
            </div>
        </div>
    )
}

const styles = {
    rules: {
        display: "flex",
        flexDirection: "column"
    },
    ruleList: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
    },
    ruleItem: {
        cursor: "help",
        textDecoration: "underline dotted"
    }
}