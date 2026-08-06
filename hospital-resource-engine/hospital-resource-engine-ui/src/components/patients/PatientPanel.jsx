import {PatientList} from "./list/PatientList";
import {useEffect, useState} from "react";
import {getPatients, savePatientList} from "../../api/patients/patients";
import {ListSelector} from "../general/lists/ListSelector";
import {loadLists} from "./ops";
import {PatientEditor} from "./editor/PatientEditor";
import {Inputs} from "../general/lists/Inputs";
import {Controls} from "../general/lists/Controls";

export function PatientPanel({patients, selected, setPatients, onSelect, onUpdate }) {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => loadLists(setLists, setSelectedList), []);

    async function handleLoad() {
        if(!selectedList) return;

        let data = await getPatients(selectedList.id);

        setPatients(data);
        onSelect(null);
    }

    async function handleSave() {
        await savePatientList(selectedList, patients);
        console.log("Saved: ", selectedList);
    }

    function onCreate(newList) {
        setLists(prev => [...prev, newList]);
        setSelectedList(newList);
        setPatients([]);
        onSelect(null);
    }

    function onDelete(list) {
        setLists(prev => prev.filter(l => l.id !== list.id));
        setSelectedList(null);
        setPatients([]);
        onSelect(null);
    }

    function updateListField(field, value) {
        let updatedList = { ...selectedList, [field]: value };
        setSelectedList(updatedList);

        setLists(prev =>
            prev.map(list => list.id === updatedList.id ? updatedList : list)
        );
    }

    function onNewPatient(newPatient) {
        setPatients(prev => [...prev, newPatient]);
        onSelect(newPatient);

        //TODO should only be used for drag and drop
        newPatient.__highlight = true;
    }

    if (!selectedList) return;

    return (
        <div className="panel">
            <h2>Patient Lists</h2>

            <ListSelector lists={lists} selected={selectedList} onChange={setSelectedList} />
            <Inputs selected={selectedList} onUpdate={updateListField} />
            <Controls selected={selectedList} load={handleLoad} save={handleSave} onCreate={onCreate}
                      onDelete={onDelete} />

            {patients.length > 0 && (
                <PatientList patients={patients} selected={selected} onSelect={onSelect} onDrop={onNewPatient} />
            )}

            <PatientEditor patient={selected} lists={lists} onChange={onUpdate} onCreate={onNewPatient} />
        </div>
    )
}