import {createPatient} from "../../../api/patients/patients";
import {PatientForm} from "./form/PatientForm";
import {Collapsible} from "../../../ui/collapsible/Collapsible";

export function PatientEditor({ patient, defaultOpen = false, onChange, onCreate }) {
    async function handleRandom() {
        let newPatient = await createPatient();

        onCreate(newPatient);
    }

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
                        <PatientForm patient={patient} onChange={onChange} />
                    </div>
                )}

                <div className="controls">
                    <button onClick={handleRandom}>
                        Create random patient
                    </button>

                    <button onClick={create}>
                        Create new patient
                    </button>
                </div>
            </Collapsible>
        </div>
    )
}