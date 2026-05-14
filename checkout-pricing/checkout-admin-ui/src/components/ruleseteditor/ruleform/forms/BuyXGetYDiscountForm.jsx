import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, StackableField, TextInput} from "../templates/FormFields";

export function BuyXGetYDiscountForm({ rule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Buy X Get Y at Discount">
            <TextInput label="Name" field="name" value={rule.name} update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} update={update} />

            <NumberInput label="Buy" field="buy" value={rule.buy} update={update} />
            <NumberInput label="Get" field="get" value={rule.get} update={update} />

            <NumberInput label="Buy Price" field="price" value={rule.price} update={update} />
            <NumberInput label="Discount (%)" field="discount" value={rule.discount} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority} update={update} />
            <StackableField rule={rule} update={update} />
        </FormTemplate>
    )
}