import {useEffect, useState} from "react";
import {VitalsForm} from "./vitals/VitalsForm";
import {SymptomsForm} from "./SymptomsForm";
import {PatientFields} from "./PatientFields";

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
                <PatientFields draft={draft} updateField={updateField} />

                <VitalsForm vitals={draft.vitals} onUpdate={updateVitals}/>
            </div>

            <SymptomsForm draft={draft} updateField={updateField}/>
        </div>
    )
}