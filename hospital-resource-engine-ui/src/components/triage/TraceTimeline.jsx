export function TraceTimeline({ steps }) {
    return (
        <div className="trace-timeline">
            {steps.map((step, i) => (
                <div key={i} className={`trace-step type-${step.type.toLowerCase()}`}>
                    <span>
                        <strong>{step.label}</strong>
                    </span>

                    <span>{step.detail}</span>
                </div>
            ))}
        </div>
    )
}