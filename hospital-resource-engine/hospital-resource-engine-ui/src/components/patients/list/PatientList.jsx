import {Patient} from "./Patient";
import {useRef} from "react";

export function PatientList({ patients, selected, onSelect, onDrop }) {
    const dropRef = useRef(null);
    const dragCounter = useRef(0);

    function onDragEnter(e) {
        e.preventDefault();
        dragCounter.current++;
        dropRef.current?.classList.add("drop-hover");
    }

    function onDragLeave(e) {
        dragCounter.current--;

        if(dragCounter.current === 0) {
            dropRef.current?.classList.remove("drop-hover");
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        dragCounter.current = 0;
        dropRef.current?.classList.remove("drop-hover");

        let json = e.dataTransfer.getData("application/json");
        if (!json) return;

        let incomingPatient = JSON.parse(json);

        dropRef.current?.classList.add("drop-animate");
        setTimeout(() => dropRef.current?.classList.remove("drop-animate"), 300);

        onDrop(incomingPatient);
    }

    return (
        <div ref={dropRef} className="panel patient-dropzone"
             onDragOver={(e) => e.preventDefault()} onDragEnter={onDragEnter}
             onDragLeave={onDragLeave} onDrop={handleDrop}>
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