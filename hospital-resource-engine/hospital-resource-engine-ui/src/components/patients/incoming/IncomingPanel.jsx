import {PatientList} from "../list/PatientList";
import {useEffect, useState} from "react";
import {createPatient} from "../../../api/patients/patients";
import {PatientForm} from "../editor/form/PatientForm";
import {Collapsible} from "../../../ui/collapsible/Collapsible";
import {loadLists} from "../ops";

export function IncomingPanel({ }) {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    //TODO move into outer layer to reuse in all patient related panels
    const [lists, setLists] = useState([]);

    useEffect(() => loadLists(setLists, () => {}), []);

    async function createRandom() {
        let newPatient = await createPatient();

        setPatients(prev => [...prev, newPatient]);
        setSelectedPatient(newPatient);
    }

    function updatePatient(updatedPatient) {
        setPatients(prev =>
            prev.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient)
        );
        setSelectedPatient(updatedPatient);
    }

    return (
        <div className="panel">
            <h2>Incoming patients</h2>

            <PatientList patients={patients} selected={selectedPatient} onSelect={setSelectedPatient} />

            {selectedPatient && (
                <Collapsible title="Patient form">
                    <PatientForm patient={selectedPatient} lists={lists} onChange={updatePatient} />
                </Collapsible>
            )}

            <button onClick={createRandom}>
                Create random patient
            </button>
        </div>
    )
}