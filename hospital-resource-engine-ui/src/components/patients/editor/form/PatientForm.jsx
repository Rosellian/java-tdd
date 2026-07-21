import {useEffect, useState} from "react";
import {VitalsForm} from "./VitalsForm";
import {Field} from "./Field";

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
        <div className="panel patient-form">
            <h2>Patient</h2>

            <div className="row-top">
                <div>
                    <div className="field">
                        <label>Name</label>

                        <input value={draft.name} onChange={e =>
                            updateField("name", e.target.value)}
                        />
                    </div>

                    <Field label="Age" name="age" value={draft.age} onChange={updateField} />

                    <div className="field">
                        <label>Triage Level</label>

                        <input value={draft.triageLevel ?? ""} readOnly />
                    </div>
                </div>

                <VitalsForm vitals={draft.vitals} onUpdate={updateVitals} />
            </div>

            <div className="row">
                <div className="field">
                    <label>Symptoms (comma separated)</label>

                    <input value={draft.symptoms.join(", ")} onChange={e =>
                        updateField("symptoms", e.target.value.split(",").map(s => s.trim()))}
                    />
                </div>
            </div>
        </div>
    )
}