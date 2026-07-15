export function TraceTimeline({ steps }) {
    return (
        <div className="trace-timeline">
            {steps.map((step, i) => (
                <div key={i} className={`trace-step type-${step.type.toLowerCase()}`}>
                    <strong>{step.label}</strong>

                    <span>{step.detail}</span>
                </div>
            ))}
        </div>
    )
}