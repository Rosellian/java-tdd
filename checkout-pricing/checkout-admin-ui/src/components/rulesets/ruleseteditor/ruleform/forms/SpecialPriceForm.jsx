import {NumberInput, StackableField, TextInput} from "../templates/FormFields";
import {FormTemplate} from "../templates/FormTemplate";
import {isChanged} from "../changeHighlighting";

export function SpecialPriceForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Special Price">
            <TextInput label="Name" field="name" value={rule.name} changed={isChanged(rule, originalRule, "name")}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={isChanged(rule, originalRule, "sku")}
                       update={update} />

            <NumberInput label="Quantity" field="quantity" value={rule.quantity}
                         changed={isChanged(rule, originalRule, "quantity")} update={update} />
            <NumberInput label="Price" field="price" value={rule.price}
                         changed={isChanged(rule, originalRule, "price")} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={isChanged(rule, originalRule, "priority")} update={update} />
            <StackableField rule={rule} originalRule={originalRule} update={update} />
        </FormTemplate>
    )
}