import {PatientList} from "./PatientList";
import {useEffect, useState} from "react";
import {getPatients, savePatientList} from "../../api/patients/patients";
import {PatientListSelector} from "./PatientListSelector";
import {loadLists} from "./ops";
import {PatientEditor} from "./PatientEditor";

export function PatientPanel({ onSelect }) {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => loadLists(setLists, setSelectedList), []);

    async function handleLoad() {
        if(!selectedList) return;

        let data = await getPatients(selectedList.id);

        setPatients(data);
        setSelectedPatient(null);
    }

    async function handleSave() {
        await savePatientList(selectedList, patients);
        console.log("Saved: ", selectedList);
    }

    function handleCreate() {
        const newList = {
            id: crypto.randomUUID(),
            name: "New List",
            version: "v1"
        };

        setLists(prev => [...prev, newList]);
        setSelectedList(newList);
        setPatients([]);
        setSelectedPatient(null);
    }

    function updateListField(field, value) {
        let updatedList = { ...selectedList, [field]: value };
        setSelectedList(updatedList);

        setLists(prev =>
            prev.map(list => list.id === updatedList.id ? updatedList : list)
        );
    }

    function handleSelect(patient) {
        setSelectedPatient(patient);
        onSelect(patient);
    }

    function onCreate(newPatient) {
        setPatients(prev => [...prev, newPatient]);
        setSelectedPatient(newPatient);
    }

    function onUpdate(updatedPatient) {
        setPatients(prev =>
            prev.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient)
        );
        setSelectedPatient(updatedPatient);
    }

    if (!selectedList) return;

    return (
        <div className="panel">
            <h2>Patient Lists</h2>

            <PatientListSelector lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />

            <div className="field">
                <label>List Name</label>

                <input value={selectedList.name}
                       onChange={e => updateListField("name", e.target.value)}
                />
            </div>

            <div className="field">
                <label>Version</label>

                <input value={selectedList.version}
                       onChange={e => updateListField("version", e.target.value)}
                />
            </div>

            <button onClick={handleLoad}>Load</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCreate}>Create new list</button>

            {patients.length > 0 && (
                <PatientList patients={patients} selected={selectedPatient} onSelect={handleSelect}/>
            )}

            <PatientEditor patient={selectedPatient} onChange={onUpdate} onCreate={onCreate} />
        </div>
    )
}