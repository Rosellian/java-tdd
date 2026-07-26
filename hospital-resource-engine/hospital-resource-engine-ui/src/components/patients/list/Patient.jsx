import {TriageBadge} from "./TriageBadge";

export function Patient({ patient, onSelect }) {
    let triageLevel = patient.triageLevel ?? "UNTRIAGED";

    return (
        <div className="patient-row" onClick={() => onSelect(patient)}>
            <span className="patient-id" title={patient.id}>
                🔑 {shortenId(patient.id)}
            </span>

            <span className="patient-name">
                {patient.name} ({patient.age})
            </span>

            <span className="patient-level">
                {triageLevel}
            </span>

            <TriageBadge level={patient.triageLevel} />
        </div>
    )
}

function shortenId(id) {
    if(id.length > 8) {
        return id.substring(0, 4) + "…" + id.substring(id.length - 4);
    }

    return id;
}