import {useState} from "react";
import {TriagePanel} from "../components/triage/TriagePanel";
import {Layout} from "../ui/layout/Layout";
import {PatientPanel} from "../components/patients/PatientPanel";

export function Main() {
    const [selected, setSelected] = useState(null);

    return (
        <Layout>
            <PatientPanel onSelect={setSelected} />

            {selected && (
                <TriagePanel patient={selected} />
            )}
        </Layout>
    )
}