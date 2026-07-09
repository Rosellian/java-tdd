import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, TextInput} from "../templates/FormFields";

export function SkuDiscountForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Sku Discount">
            <TextInput label="Name" field="name" value={rule.name} changed={rule.name !== originalRule.name}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={rule.sku !== originalRule.sku}
                       update={update} />

            <NumberInput label="Discount" field="discount" value={rule.discount}
                         changed={rule.discount !== originalRule.discount} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={rule.priority !== originalRule.priority} update={update} />
        </FormTemplate>
    )
}