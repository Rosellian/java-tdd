import {useEffect, useState} from "react";
import {PatientList} from "./list/PatientList";
import {loadPatients} from "./ops";

export function AllPatientsPanel({ onSelect }) {
    const [patients, setPatients] = useState([]);

    useEffect(() => loadPatients(setPatients), []);

    return (
        <div className="panel">
            <h2>All Patients</h2>

            <PatientList patients={patients} onSelect={onSelect} />
        </div>
    )
}