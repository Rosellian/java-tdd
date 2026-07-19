import {PatientList} from "./PatientList";
import {useEffect, useState} from "react";
import {getPatients, savePatientList} from "../../api/patients/patients";
import {PatientListSelector} from "./PatientListSelector";
import {loadLists} from "./ops";
import {PatientEditor} from "./PatientEditor";
import {Inputs} from "./lists/Inputs";
import {Controls} from "./lists/Controls";

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

    function onCreate(newList) {
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

    function onSelectPatient(patient) {
        setSelectedPatient(patient);
        onSelect(patient);
    }

    function onCreatePatient(newPatient) {
        setPatients(prev => [...prev, newPatient]);
        setSelectedPatient(newPatient);
    }

    function onUpdatePatient(updatedPatient) {
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
            <Inputs selected={selectedList} onUpdate={updateListField} />
            <Controls load={handleLoad} save={handleSave} onCreate={onCreate} />

            {patients.length > 0 && (
                <PatientList patients={patients} selected={selectedPatient} onSelect={onSelectPatient} />
            )}

            <PatientEditor patient={selectedPatient} onChange={onUpdatePatient} onCreate={onCreatePatient} />
        </div>
    )
}