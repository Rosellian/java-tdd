export function RuleTimeline({ rules }) {
    return (
        <section className="rule-timeline">
            <h3>Rule Timeline</h3>

            <div className="timeline">
                {rules.map((r) => (
                    <div
                        key={r.id}
                        className={`timeline-item ${r.matched ? "matched" : "skipped"}`}
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