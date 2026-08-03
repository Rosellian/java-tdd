import {Patient} from "./Patient";

export function PatientList({ patients, selected, onSelect, onDrop }) {
    function onDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add("drop-hover");
    }

    function onDragLeave(e) {
        e.currentTarget.classList.remove("drop-hover");
    }

    function handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove("drop-hover");

        let json = e.dataTransfer.getData("application/json");
        if (!json) return;

        let incomingPatient = JSON.parse(json);
        onDrop(incomingPatient);
    }

    return (
        <div className="panel patient-dropzone" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={handleDrop}>
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