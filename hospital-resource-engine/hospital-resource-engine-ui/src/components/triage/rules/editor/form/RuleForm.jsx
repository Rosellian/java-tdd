import {useEffect, useState} from "react";
import {LevelSelector} from "./LevelSelector";
import {TextField} from "../../../../general/form/TextField";
import {ConditionForm} from "./condition/ConditionForm";

export function RuleForm({ rule, onChange }) {
    const [draft, setDraft] = useState(rule);

    useEffect(() => {
        setDraft(rule);
    }, [rule]);

    function updateField(field, value) {
        let updated = { ...draft, [field]: value };

        setDraft(updated);
        onChange(updated);
    }

    return (
        <div className="panel">
            <TextField label="ID" name="id" value={draft.id} readOnly={true} />

            <TextField label="Name" name="name" value={draft.name} onUpdate={updateField} />
            <TextField label="Description" name="description" value={draft.description} onUpdate={updateField} />

            <ConditionForm condition={draft.condition} onChange={updateField} />

            <LevelSelector selected={rule} onSelect={value => updateField("result", value)} />
        </div>
    )
}