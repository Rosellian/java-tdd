export function PatientList({ patients, selected, onSelect }) {
    return (
        <div className="panel">
            <h2>Patients</h2>

            <ul>
                {patients.map(patient => (
                    <li key={patient.id} className={selectedClass(patient, selected)}>
                        <Patient patient={patient} onSelect={onSelect} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function selectedClass(patient, selected) {
    return patient.id === selected?.id ? "selected" : "";
}

function Patient({ patient, onSelect }) {
    let triageLevel = patient.triageLevel ?? "UNTRIAGED";

    return (
        <div onClick={() => onSelect(patient)}>
            {patient.id} {patient.name} ({patient.age}) — {triageLevel}

            <TriageBadge level={patient.triageLevel} />
        </div>
    )
}

function TriageBadge({ level }) {
    if (!level) return null;

    return (
        <span className={`triage-badge triage-${level.toLowerCase()}`}>
            {level[0]}
        </span>
    )
}