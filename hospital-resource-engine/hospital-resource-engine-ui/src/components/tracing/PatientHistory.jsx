import {HistoryEntry} from "./HistoryEntry";

export function PatientHistory({ patient }) {
    if (!patient || !patient.history || patient.history.length === 0) {
        return (
            <div className="panel">
                <h3>History</h3>

                <p>No history yet.</p>
            </div>
        )
    }

    return (
        <div className="panel">
            <h3>History</h3>

            <ul className="history-list">
                {patient.history.map((entry, i) => (
                    <li key={i} className="history-entry">
                        <HistoryEntry entry={entry} />
                    </li>
                ))}
            </ul>
        </div>
    )
}