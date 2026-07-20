import {useState} from "react";
import {TriagePanel} from "../components/triage/TriagePanel";
import {Layout} from "../ui/layout/Layout";
import {PatientPanel} from "../components/patients/PatientPanel";

export function Main() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    function updatePatient(updatedPatient) {
        setPatients(prev =>
            prev.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient)
        );
        setSelectedPatient(updatedPatient);
    }

    return (
        <Layout>
            <PatientPanel patients={patients} selected={selectedPatient} setPatients={setPatients}
                          onSelect={setSelectedPatient} onUpdate={updatePatient} />

            {selectedPatient && (
                <TriagePanel patient={selectedPatient} onUpdate={updatePatient} />
            )}
        </Layout>
    )
}