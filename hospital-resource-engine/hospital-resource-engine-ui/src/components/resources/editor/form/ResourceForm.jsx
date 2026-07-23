import {Field} from "../../../general/form/Field";
import {TypeSelector} from "./TypeSelector";
import {useEffect, useState} from "react";
import {getFullClass} from "../../resource";

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

            <Field label="Used" name="used" value={draft.used} className={getFullClass(resource)}
                   onUpdate={updateField} />
            <Field label="Capacity" name="capacity" value={draft.capacity} className={getFullClass(resource)}
                   onUpdate={updateField} />
        </div>
    )
}