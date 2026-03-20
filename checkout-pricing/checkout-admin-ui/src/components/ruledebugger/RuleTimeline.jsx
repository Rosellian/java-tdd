import {useState} from "react";
import {useTraceSync} from "./TraceSyncProvider";

export function RuleTimeline({ rules }) {
    const {selectedStep} = useTraceSync();

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

function RuleItem({ rule }) {
    const [open, setOpen] = useState(false);
    const {selectedStep, setSelectedStep} = useTraceSync();

    const isActive = rule.stepIndex === selectedStep;

    return (
        <li style={{
            ...styles.timelineItem,
            ...(isActive ? styles.ruleActive : {})
        }}>
            <div style={styles.ruleHeader} onClick={() => {
                setOpen(!open)
                setSelectedStep(selectedStep);
            }}>
                <span style={styles.ruleName}>{rule.name}</span>
                <span style={styles.ruleToggle}>{open ? "▲" : "▼"}</span>
            </div>

            {open && (
                <div style={styles.ruleBody}>
                    <div style={styles.ruleDesc}>{rule.description}</div>
                    <div style={styles.ruleEffect}>{rule.delta}</div>
                </div>
            )}
        </li>
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
    },
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
    },
    ruleActive: {
        background: "#222",
        borderLeft: "3px solid #BB86FC",
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