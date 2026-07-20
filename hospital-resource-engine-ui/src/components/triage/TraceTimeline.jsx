export function TraceTimeline({ steps }) {
    return (
        <div className="trace-timeline">
            {steps.map((step, i) => (
                <div key={i} className={getTypeClass(step)}>
                    <span>
                        <strong>{step.label}</strong>
                    </span>

                    <span>{step.detail}</span>
                </div>
            ))}
        </div>
    )
}

function getTypeClass(step) {
    return `trace-step type-${step.type.toLowerCase()}`;
}