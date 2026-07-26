import {TriageBadge} from "./TriageBadge";
import {truncatedIdWithIcon} from "../../general/ids";

export function Patient({ patient, onSelect }) {
    let triageLevel = patient.triageLevel ?? "UNTRIAGED";

    return (
        <div className="patient-row" onClick={() => onSelect(patient)}>
            <span className="patient-id" title={patient.id}>
                {truncatedIdWithIcon(patient.id)}
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