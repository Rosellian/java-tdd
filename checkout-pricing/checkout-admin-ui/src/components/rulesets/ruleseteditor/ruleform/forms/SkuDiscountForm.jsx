import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, TextInput} from "../templates/FormFields";
import {isChanged} from "../changeHighlighting";

export function SkuDiscountForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Sku Discount">
            <TextInput label="Name" field="name" value={rule.name} changed={isChanged(rule, originalRule, "name")}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={isChanged(rule, originalRule, "sku")}
                       update={update} />

            <NumberInput label="Discount" field="discount" value={rule.discount}
                         changed={isChanged(rule, originalRule, "discount")} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={isChanged(rule, originalRule, "priority")} update={update} />
        </FormTemplate>
    )
}