import {TraceTimeline} from "../triage/TraceTimeline";
import {TriageBadge} from "../triage/TriageBadge";

export function HistoryEntry({ entry }) {
    return (
        <div className="history-entry-row">
            <div className="history-header">
                {entry.type === "TRIAGE" && (
                    <>
                        <span className="history-icon">🩺</span>

                        <span className="history-title">Triage</span>

                        <TriageBadge level={entry.level} />
                    </>
                )}

                {entry.type === "ALLOCATION" && (
                    <>
                        <span className="history-icon">📦</span>

                        <span className="history-title">Allocation</span>

                        <span className="history-status">{entry.status}</span>
                    </>
                )}

                <span className="history-time">
                    {new Date(entry.timestamp).toLocaleString()}
                </span>
            </div>

            <TraceTimeline steps={entry.trace} />
        </div>
    )
}