export function EventHeader({event, index, onClick}) {
    return (
        <div style={styles.eventHeader} onClick={onClick}>
            <strong>{index + 1}. {event.ruleName}</strong>
            <span style={{ color: event.applied ? "#7CFC7C" : "#FF6B6B" }}>
                {event.applied ? "✔ Applied" : "✖ Skipped"}
            </span>
        </div>
    )
}

const styles = {
    eventHeader: {
        padding: 10,
        background: "#2A2A2A",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
    }
}