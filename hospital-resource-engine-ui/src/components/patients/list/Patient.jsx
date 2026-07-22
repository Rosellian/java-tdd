import {TriageBadge} from "./TriageBadge";

export function Patient({ patient, onSelect }) {
    let triageLevel = patient.triageLevel ?? "UNTRIAGED";

    return (
        <div onClick={() => onSelect(patient)}>
            {patient.id} {patient.name} ({patient.age}) — {triageLevel}

            <TriageBadge level={patient.triageLevel} />
        </div>
    )
}