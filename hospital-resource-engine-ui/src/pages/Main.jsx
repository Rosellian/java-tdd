import {useState} from "react";
import {PatientCreatePanel} from "../components/patients/PatientCreatePanel";
import {TriagePanel} from "../components/triage/TriagePanel";
import {PatientList} from "../components/patients/PatientList";
import {Layout} from "../ui/layout/Layout";

export function Main() {
    const [patients, setPatients] = useState([]);
    const [selected, setSelected] = useState(null);

    function handleCreated(newPatient) {
        setPatients(prev => [...prev, newPatient]);
    }

    function handleUpdate(updatedPatient) {
        setPatients(prev =>
            prev.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient));

        setSelected(updatedPatient);
    }

    return (
        <Layout>
            <PatientCreatePanel patient={selected} onChange={handleUpdate} onCreated={handleCreated} />

            <PatientList patients={patients} selected={selected} onSelect={setSelected} />

            {selected && (
                <TriagePanel patient={selected} />
            )}
        </Layout>
    )
}