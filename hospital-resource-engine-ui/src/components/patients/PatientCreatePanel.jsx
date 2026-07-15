import {createPatient} from "../../api/patients/patients";
import {PatientForm} from "./form/PatientForm";
import {tokens} from "../../ui/theme/tokens";
import {useTheme} from "../../ui/theme/ThemeProvider";

export function PatientCreatePanel({ patient, onChange, onCreated }) {
    const { theme } = useTheme();
    const t = tokens[theme];

    async function handleRandom() {
        //TODO support empty payload
        let newPatient = await createPatient();

        onCreated(newPatient);
    }

    return (
        <div className="panel">
            {patient && (
                <PatientForm patient={patient} onChange={onChange} />
            )}

            <button onClick={handleRandom} style={{
                color: t.text,
                background: t.background
            }}>
                Create random patient
            </button>
        </div>
    )
}