import {createPatient} from "../../../api/patients/patients";
import {PatientForm} from "./form/PatientForm";
import {Collapsible} from "../../../ui/collapsible/Collapsible";

export function PatientEditor({ patient, onChange, onCreate }) {
    async function handleRandom() {
        let newPatient = await createPatient();

        onCreate(newPatient);
    }

    return (
        <div className="panel">
            <Collapsible title="Editor">
                {patient && (
                    <div>
                        <PatientForm patient={patient} onChange={onChange} />
                    </div>
                )}

                <button onClick={handleRandom}>
                    Create random patient
                </button>
            </Collapsible>
        </div>
    )
}