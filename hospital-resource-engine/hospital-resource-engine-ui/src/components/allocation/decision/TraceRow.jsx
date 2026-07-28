import {getTraceIcon} from "../../tracing/tracing";

export function TraceRow({ trace }) {
    return (
        <div className="allocation-row">
            <span className="label">Trace:</span>

            <ul className="trace-list">
                {trace.map((step, i) => (
                    <li key={i} className="trace-row">
                        <span className="trace-icon">
                            {getTraceIcon(step.type)}
                        </span>

                        <span className="trace-label">{step.label}</span>

                        <span className="trace-detail">{step.detail}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}