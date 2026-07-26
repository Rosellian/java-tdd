import {useEffect, useState} from "react";
import {PatientList} from "./list/PatientList";
import {loadPatients} from "./ops";

export function AllPatientsPanel({ selected, onSelect }) {
    const [patients, setPatients] = useState([]);

    useEffect(() => loadPatients(setPatients), []);

    return (
        <div className="panel">
            <h2>All Patients</h2>

            <PatientList patients={patients} selected={selected} onSelect={onSelect} />
        </div>
    )
}