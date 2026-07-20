import {useEffect, useState} from "react";
import {VitalsForm} from "./VitalsForm";

export function PatientForm({ patient, onChange }) {
    const [draft, setDraft] = useState(patient);

    useEffect(() => {
        setDraft(patient);
    }, [patient]);

    function updateField(field, value) {
        let updated = { ...draft, [field]: value };

        setDraft(updated);
        onChange(updated);
    }

    function updateVitals(field, value) {
        let updatedVitals = { ...draft.vitals, [field]: value };

        updateField("vitals", updatedVitals);
    }

    return (
        <div className="panel">
            <h2>Patient</h2>

            <div className="field">
                <label>Name</label>

                <input value={draft.name} onChange={e =>
                    updateField("name", e.target.value)}
                />
            </div>

            <div className="field">
                <label>Age</label>

                <input type="number" value={draft.age} onChange={e =>
                    updateField("age", Number(e.target.value))}
                />
            </div>

            <VitalsForm vitals={draft.vitals} onUpdate={updateVitals} />

            <h3>Symptoms</h3>

            <div className="field">
                <label>Symptoms (comma separated)</label>

                <input value={draft.symptoms.join(", ")} onChange={e =>
                    updateField("symptoms", e.target.value.split(",").map(s => s.trim()))}
                />
            </div>

            <div className="field">
                <label>Triage Level</label>

                <input value={draft.triageLevel ?? ""} readOnly />
            </div>
        </div>
    )
}