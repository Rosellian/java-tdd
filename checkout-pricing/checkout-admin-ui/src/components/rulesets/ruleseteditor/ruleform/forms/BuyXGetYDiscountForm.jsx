import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, StackableField, TextInput} from "../templates/FormFields";
import {isChanged} from "../changeHighlighting";

export function BuyXGetYDiscountForm({ rule, originalRule, unitPrice, onChange }) {

    function update(field, value) {
        onChange({...rule, [field]: value});
    }

    let buy = rule.buy ?? 0;
    let skuPrice = unitPrice ?? 0;

    let buyPrice = buy * skuPrice;

    return (
        <FormTemplate title="Buy X Get Y at Discount">
            <TextInput label="Name" field="name" value={rule.name} changed={isChanged(rule, originalRule, "name")}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={isChanged(rule, originalRule, "sku")}
                       update={update} />

            <NumberInput label="Buy" field="buy" value={rule.buy} changed={isChanged(rule, originalRule, "buy")}
                         update={update} />
            <NumberInput label="Get" field="get" value={rule.get} changed={isChanged(rule, originalRule, "get")}
                         update={update} />

            {/*TODO display with a simpler none-input component*/}
            <NumberInput label="Buy Price" field="price" value={buyPrice} disabled={true} />

            <NumberInput label="Discount (%)" field="discount" value={rule.discount}
                         changed={isChanged(rule, originalRule, "discount")} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={isChanged(rule, originalRule, "priority")} update={update} />
            <StackableField rule={rule} originalRule={originalRule} update={update} />
        </FormTemplate>
    )
}