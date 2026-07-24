import {Field} from "../../../general/form/Field";
import {TypeSelector} from "./TypeSelector";
import {useEffect, useState} from "react";
import {getFullClass} from "../../resource";
import {TextField} from "../../../general/form/TextField";

export function ResourceForm({ resource, onChange }) {
    const [draft, setDraft] = useState(resource);

    useEffect(() => {
        setDraft(resource);
    }, [resource]);

    function updateField(field, value) {
        let updated = { ...draft, [field]: value };

        setDraft(updated);
        onChange(updated);
    }

    return (
        <div className="panel">
            <TextField label="ID" name="id" value={draft.id} readOnly={true} />
            <TypeSelector selected={resource} onSelect={(value) => updateField("type", value)} />

            <Field label="Used" name="used" value={draft.used} className={getFullClass(resource)}
                   onUpdate={updateField} />
            <Field label="Capacity" name="capacity" value={draft.capacity} className={getFullClass(resource)}
                   onUpdate={updateField} />
        </div>
    )
}