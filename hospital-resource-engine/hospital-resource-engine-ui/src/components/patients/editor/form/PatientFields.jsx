import {Field} from "../../../general/form/Field";
import {TextField} from "../../../general/form/TextField";

export function PatientFields({ draft, updateField }) {
    return (
        <div>
            <TextField label="ID" name="id" value={draft.id} readOnly={true} />

            <TextField label="Name" name="name" value={draft.name} onUpdate={updateField} />

            <Field label="Age" name="age" value={draft.age} onChange={updateField}/>

            <TextField label="Triage Level" name="triageLevel" value={draft.triageLevel ?? ""} readOnly={true} />
        </div>
    )
}