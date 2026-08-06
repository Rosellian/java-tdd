import {PatientForm} from "./form/PatientForm";
import {Collapsible} from "../../../ui/collapsible/Collapsible";

export function PatientEditor({ patient, lists, defaultOpen = false, onChange, onCreate }) {

    function create() {
        let newPatient = {
            id: crypto.randomUUID(),
            name: "New Patient",
            age: 0,
            vitals: {
                heartRate: 60,
                systolicBP: 120,
                diastolicBP: 80,
                oxygenSaturation: 98,
                temperature: 37,
            },
            symptoms: []
        };

        onCreate(newPatient);
    }

    return (
        <div className="panel">
            <Collapsible title="Editor" defaultOpen={defaultOpen}>
                {patient && (
                    <div>
                        <PatientForm patient={patient} lists={lists} onChange={onChange} />
                    </div>
                )}

                <div className="controls">
                    <button onClick={create}>
                        Create new patient
                    </button>
                </div>
            </Collapsible>
        </div>
    )
}