import {useState} from "react";

export function RuleTimeline({ events }) {
    return (
        <div>
            {events.map((e, i) => (
                <RuleEvent key={i} event={e} index={i} />
            ))}
        </div>
    );
}

function RuleEvent({ event, index }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.event}>
            <div style={styles.eventHeader} onClick={() => setOpen(!open)}>
                <strong>{index + 1}. {event.ruleName}</strong>
                <span style={{ color: event.applied ? "#7CFC7C" : "#FF6B6B" }}>
          {event.applied ? "✔ Applied" : "✖ Skipped"}
        </span>
            </div>

            {open && (
                <div style={styles.eventBody}>
                    <pre>Delta: {JSON.stringify(event.delta, null, 2)}</pre>
                    <pre>Before: {JSON.stringify(event.before, null, 2)}</pre>
                    <pre>After: {JSON.stringify(event.after, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

const styles = {
    event: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
    },
    eventHeader: {
        padding: 10,
        background: "#2A2A2A",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
    },
    eventBody: {
        padding: 10,
        background: "#1A1A1A",
    },
}