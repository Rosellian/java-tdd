import {Field} from "./Field";

export function PatientFields({ draft, updateField }) {
    return (
        <div>
            <div className="field">
                <label>Name</label>

                <input value={draft.name} onChange={e =>
                    updateField("name", e.target.value)}
                />
            </div>

            <Field label="Age" name="age" value={draft.age} onChange={updateField}/>

            <div className="field">
                <label>Triage Level</label>

                <input value={draft.triageLevel ?? ""} readOnly/>
            </div>
        </div>
    )
}