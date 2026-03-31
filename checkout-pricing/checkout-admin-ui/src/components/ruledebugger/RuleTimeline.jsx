import {RuleItem} from "./ruletimeline/RuleItem";

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
                    <RuleItem key={i} rule={r} />
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
    timelineEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    }
};