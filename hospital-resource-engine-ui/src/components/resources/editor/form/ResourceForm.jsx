import {Field} from "../../../general/form/Field";
import {TypeSelector} from "./TypeSelector";
import {useEffect, useState} from "react";

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
            <TypeSelector selected={resource} onSelect={(value) => updateField("type", value)} />

            <Field label="Used" name="used" value={draft.used} onUpdate={updateField} />
            <Field label="Capacity" name="capacity" value={draft.capacity} onUpdate={updateField} />
        </div>
    )
}