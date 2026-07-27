import {Field} from "../../../../../general/form/Field";
import {OperatorSelector} from "./OperatorSelector";
import {FieldSelector} from "./FieldSelector";
import {TextField} from "../../../../../general/form/TextField";

const SYMPTOMS = "symptoms";

export function ConditionForm({ condition, onChange }) {

    function adjustOperator(field, value, updated) {
        if (field === "field") {
            if (value === SYMPTOMS) {
                updated.operator = "contains";
            } else if (condition.field === SYMPTOMS) {
                updated.operator = "==";
            }
        }
    }

    function updateField(field, value) {
        let updated = { ...condition, [field]: value };

        adjustOperator(field, value, updated);

        onChange("condition", updated);
    }

    let symptomsSelected = condition.field === SYMPTOMS;

    return (
        <div>
            <h3>Condition</h3>

            <div className="condition-selectors">
                <FieldSelector selected={condition.field} onSelect={value => updateField("field", value)} />

                <OperatorSelector selected={condition.operator} locked={symptomsSelected}
                                  onSelect={value => updateField("operator", value)} />
            </div>

            {symptomsSelected ?
                <TextField label="Symptoms (comma-separated)" name="value" value={condition.value}
                           onUpdate={updateField} />
                :  <Field label="Value" name="value" value={condition.value} onUpdate={updateField} />
            }
        </div>
    )
}