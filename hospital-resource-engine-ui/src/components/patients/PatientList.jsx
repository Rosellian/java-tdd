export function PatientList({ patients, onSelect }) {
    return (
        <div className="panel">
            <h2>Patients</h2>

            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        <button onClick={() => onSelect(patient)}>
                            {patient.id} {patient.name} ({patient.age}) — {patient.triageLevel ?? "UNTRIAGED"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}