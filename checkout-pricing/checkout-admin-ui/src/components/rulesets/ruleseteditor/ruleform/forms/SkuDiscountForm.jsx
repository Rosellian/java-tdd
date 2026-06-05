import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, TextInput} from "../templates/FormFields";

export function SkuDiscountForm({ rule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Sku Discount">
            <TextInput label="Name" field="name" value={rule.name} update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} update={update} />

            <NumberInput label="Discount" field="discount" value={rule.discount} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority} update={update} />
        </FormTemplate>
    )
}