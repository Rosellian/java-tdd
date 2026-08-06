import {useEffect, useState} from "react";
import {PatientList} from "./list/PatientList";
import {handleDelete, handleSave, loadLists, loadPatients} from "./ops";
import {PatientEditor} from "./editor/PatientEditor";
import {ConfirmModal} from "../general/modals/ConfirmModal";

export function AllPatientsPanel({ selected, onSelect}) {
    const [patients, setPatients] = useState([]);

    useEffect(() => loadPatients(setPatients), []);

    //TODO move into outer layer to reuse in all patient related panels
    const [lists, setLists] = useState([]);
    useEffect(() => loadLists(setLists, () => {}), []);

    //TODO implement separate patient draft
    const [draft, setDraft] = useState(selected);

    function reload() {
        loadPatients(setPatients);
    }

    function save() {
        handleSave(selected);
    }

    const [showConfirm, setShowConfirm] = useState(false);


    function deletePatient() {
        setShowConfirm(true);
    }

    function onConfirmDelete(confirmed) {
        setShowConfirm(false);

        if (confirmed) {
            handleDelete(selected);
        }
    }

    function onUpdate(updatedPatient) {
        onSelect(updatedPatient);
    }

    return (
        <div className="panel">
            <h2>All Patients</h2>

            <PatientList patients={patients} selected={selected} onSelect={onSelect} />

            <div className="controls">
                <button onClick={reload}>Reload patients</button>
                <button onClick={save}>Save patient</button>

                <button onClick={deletePatient}>Delete patient</button>

                {showConfirm && (
                    <ConfirmModal message={createDeleteMessage(selected)}
                                  onConfirm={() => onConfirmDelete(true)}
                                  onCancel={() => onConfirmDelete(false)} />
                )}
            </div>

            <PatientEditor patient={selected} lists={lists} onChange={onUpdate} onCreate={onUpdate} />
        </div>
    )
}

function createDeleteMessage(patient) {
    let patientString = "";

    if(patient) {
        patientString = `"${patient.name}"(${patient.age}) ID: ${patient.id}`;
    }

    return `Delete ${patientString} ?`;
}