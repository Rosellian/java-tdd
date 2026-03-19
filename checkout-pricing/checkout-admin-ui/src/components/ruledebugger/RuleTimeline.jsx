export function RuleTimeline({ rules }) {
    if (!rules) {
        return (
            <div style={styles.timelineEmpty}>
                No rules matched in this step.
            </div>
        );
    }

    return (
        <div style={styles.timelineWrapper}>
            <h3 style={styles.timelineHeader}>Rule Timeline</h3>

            <ul style={styles.timelineList}>
                {rules.map((r, i) => (
                    <li key={i} style={styles.timelineItem}>
                        <div style={styles.ruleName}>{r.name}</div>
                        <div style={styles.ruleDesc}>{r.description}</div>
                        <div style={styles.ruleEffect}>
                            {r.delta}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    timelineWrapper: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },

    timelineHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#fff",
    },

    timelineList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },

    timelineItem: {
        padding: "10px 0",
        borderBottom: "1px solid #333",
    },

    ruleName: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#BB86FC",
    },

    ruleDesc: {
        fontSize: "0.85rem",
        color: "#bbb",
        marginTop: 2,
    },

    ruleEffect: {
        marginTop: 4,
        fontSize: "0.85rem",
        color: "#4caf50",
    },

    timelineItemMatched: {
        color: "#4caf50",
    },

    timelineItemSkipped: {
        color: "#f44336",
    },

    timelineEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    },
};