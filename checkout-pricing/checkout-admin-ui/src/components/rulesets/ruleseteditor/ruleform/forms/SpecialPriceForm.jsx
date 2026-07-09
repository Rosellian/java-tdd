import {NumberInput, StackableField, TextInput} from "../templates/FormFields";
import {FormTemplate} from "../templates/FormTemplate";

export function SpecialPriceForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Special Price">
            <TextInput label="Name" field="name" value={rule.name} changed={rule.name !== originalRule.name}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={rule.sku !== originalRule.sku}
                       update={update} />

            <NumberInput label="Quantity" field="quantity" value={rule.quantity}
                         changed={rule.quantity !== originalRule.quantity} update={update} />
            <NumberInput label="Price" field="price" value={rule.price} changed={rule.price !== originalRule.price}
                         update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={rule.priority !== originalRule.priority} update={update} />
            <StackableField rule={rule} originalRule={originalRule} update={update} />
        </FormTemplate>
    )
}