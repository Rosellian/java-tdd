import {PatientList} from "./PatientList";
import {useEffect, useState} from "react";
import {getPatientLists, getPatients} from "../../api/patients/patients";

export function PatientPanel({ onSelect }) {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => loadLists, []);

    async function loadLists() {
        try {
            let data = await getPatientLists();
            setLists(data);

            if (data.length > 0) {
                setSelectedList(data[0]);
            }
        } catch (err) {
            console.error("Failed to load patient lists:", err);
        }
    }

    async function handleLoad() {
        let list = lists.find(l => l.id === selectedList.id);
        if(!list) return;

        let data = await getPatients(list.id);

        setPatients(data);
        setSelectedPatient(null);
    }

    function handleSelect(patient) {
        setSelectedPatient(patient);
        onSelect(patient);
    }

    if (!lists || !selectedList) return;

    return (
        <div className="panel">
            <h2>Patient Lists</h2>

            <div className="field">
                <label>Select list</label>

                <select value={selectedList.id}
                        onChange={e => setSelectedList(e.target.value)}
                >
                    {lists.map(list => (
                        <option key={list.id} value={list.id}>
                            {list.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleLoad}>
                Load
            </button>

            {patients.length > 0 && (
                <PatientList patients={patients} onSelect={handleSelect} selected={selectedPatient} />
            )}
        </div>
    )
}