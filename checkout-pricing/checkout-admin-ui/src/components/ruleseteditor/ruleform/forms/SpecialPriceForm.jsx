import {NumberInput, StackableField, TextInput} from "../templates/FormFields";
import {FormTemplate} from "../templates/FormTemplate";

export function SpecialPriceForm({ rule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Special Price">
            <TextInput label="Name" field="name" value={rule.name} update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} update={update} />

            <NumberInput label="Quantity" field="quantity" value={rule.quantity} update={update} />
            <NumberInput label="Price" field="price" value={rule.price} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority} update={update} />
            <StackableField rule={rule} update={update} />
        </FormTemplate>
    )
}