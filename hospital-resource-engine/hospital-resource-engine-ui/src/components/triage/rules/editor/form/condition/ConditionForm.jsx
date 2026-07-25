import {Field} from "../../../../../general/form/Field";
import {OperatorSelector} from "./OperatorSelector";
import {FieldSelector} from "./FieldSelector";
import {TextField} from "../../../../../general/form/TextField";

export function ConditionForm({ condition, onChange }) {

    function updateField(field, value) {
        let updated = { ...condition, [field]: value };

        onChange("condition", updated);
    }

    return (
        <div>
            <h3>Condition</h3>

            <FieldSelector selected={condition.field} onSelect={value => updateField("field", value)} />

            <OperatorSelector selected={condition.operator} onSelect={value => updateField("operator", value)} />

            {condition.field === "symptoms" ?
                <TextField label="value" name="value" value={condition.value} onChange={updateField} />
                :  <Field label="value" name="value" value={condition.value} onUpdate={updateField} />
            }
        </div>
    )
}