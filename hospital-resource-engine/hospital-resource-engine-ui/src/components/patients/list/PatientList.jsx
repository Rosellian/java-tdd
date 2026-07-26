import {Patient} from "./Patient";

export function PatientList({ patients, selected, onSelect }) {
    return (
        <div className="panel">
            <h2>Patients ({patients.length})</h2>

            <div className="list-scroll">
                <ul>
                    {patients.map(patient => (
                        <li key={patient.id} className={selectedClass(patient, selected)}>
                            <Patient patient={patient} onSelect={onSelect} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function selectedClass(patient, selected) {
    return patient.id === selected?.id ? "selected" : "";
}