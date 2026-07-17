import {createPatient} from "../../api/patients/patients";
import {PatientForm} from "./form/PatientForm";

export function PatientCreatePanel({ patient, onChange, onCreated }) {
    async function handleRandom() {
        let newPatient = await createPatient();

        onCreated(newPatient);
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