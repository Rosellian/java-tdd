export function RuleTimeline({ rules }) {
    return (
        <section className="rule-timeline">
            <h3>Rule Timeline</h3>

            <div className="timeline">
                {rules.map((r) => (
                    <div
                        key={r.id}
                        style={r.matched ? styles.timelineItemMatched : styles.timelineItemSkipped}
                    >
                        <span className="rule-name">{r.name}</span>
                        <span className="rule-delta">
                        {r.delta > 0 ? "+" : ""}
                            {r.delta}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

const styles = {
    timelineItemMatched: {
        color: "#4caf50",
    },

    timelineItemSkipped: {
        color: "#f44336",
    },
}