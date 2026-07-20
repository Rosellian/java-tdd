import {createPatient} from "../../../api/patients/patients";
import {PatientForm} from "./form/PatientForm";

export function PatientEditor({ patient, onChange, onCreate }) {
    async function handleRandom() {
        let newPatient = await createPatient();

        onCreate(newPatient);
    }

    return (
        <div className="panel">
            {patient && (
                <PatientForm patient={patient} onChange={onChange} />
            )}

            <button onClick={handleRandom}>
                Create random patient
            </button>
        </div>
    )
}