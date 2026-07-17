export function PatientList({ patients, selected, onSelect }) {
    return (
        <div className="panel">
            <h2>Patients</h2>

            <ul>
                {patients.map(patient => (
                    <li key={patient.id} className={selectedClass(patient, selected)}>
                        <div onClick={() => onSelect(patient)}>
                            {patient.id} {patient.name} ({patient.age}) — {patient.triageLevel ?? "UNTRIAGED"}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function selectedClass(patient, selected) {
    return patient.id === selected?.id ? "selected" : "";
}