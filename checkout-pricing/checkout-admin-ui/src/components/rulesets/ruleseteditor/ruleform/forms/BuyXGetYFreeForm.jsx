import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, StackableField, TextInput} from "../templates/FormFields";

export function BuyXGetYFreeForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Buy X Get Y Free">
            <TextInput label="Name" field="name" value={rule.name} changed={rule.name !== originalRule.name}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={rule.sku !== originalRule.sku}
                       update={update} />

            <NumberInput label="Buy" field="buy" value={rule.buy} changed={rule.buy !== originalRule.buy}
                         update={update} />
            <NumberInput label="Get" field="get" value={rule.get} changed={rule.get !== originalRule.get}
                         update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={rule.priority !== originalRule.priority} update={update} />
            <StackableField rule={rule} originalRule={originalRule} update={update} />
        </FormTemplate>
    )
}