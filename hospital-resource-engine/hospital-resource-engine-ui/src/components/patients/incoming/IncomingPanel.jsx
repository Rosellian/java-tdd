import {PatientList} from "../list/PatientList";
import {useState} from "react";
import {PatientEditor} from "../editor/PatientEditor";
import {createPatient} from "../../../api/patients/patients";
import {PatientForm} from "../editor/form/PatientForm";
import {Collapsible} from "../../../ui/collapsible/Collapsible";

export function IncomingPanel({  }) {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

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
                    <PatientForm patient={selectedPatient} onChange={updatePatient} />
                </Collapsible>
            )}

            <button onClick={createRandom}>
                Create random patient
            </button>
        </div>
    )
}