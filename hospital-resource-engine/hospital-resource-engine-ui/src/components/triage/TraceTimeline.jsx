export function TraceTimeline({ steps }) {
    return (
        <div className="trace-timeline">
            {steps.map((step, i) => (
                <div key={i} className="trace-block">
                    <div className={getTypeClass(step)}
                         style={{ animationDelay: `${i * 80}ms` }}
                    >
                    <span>
                        <strong>{step.label}</strong>
                    </span>

                        <span>{step.detail}</span>
                    </div>

                    {i < steps.length - 1 && (
                        <div className="trace-line" style={{ animationDelay: `${i * 80}ms` }}></div>
                    )}
                </div>
            ))}
        </div>
    )
}

function getTypeClass(step) {
    return `trace-step type-${step.type.toLowerCase()} animate-step`;
}