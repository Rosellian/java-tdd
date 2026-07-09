import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, StackableField, TextInput} from "../templates/FormFields";

export function CrossSkuBuyXGetYDiscountForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Cross SKU Buy X Get Y at Discount">
            <div style={styles.name}>
                <TextInput label="Name" field="name" value={rule.name} changed={rule.name !== originalRule.name}
                           update={update} />
            </div>

            <TextInput label="Buy SKU" field="buySku" value={rule.buySku} changed={rule.buySku !== originalRule.buySku}
                       update={update} />
            <NumberInput label="Buy Quantity" field="buyQty" value={rule.buyQty}
                         changed={rule.buyQty !== originalRule.buyQty} update={update} />

            <TextInput label="Discount SKU" field="discountSku" value={rule.discountSku}
                       changed={rule.discountSku !== originalRule.discountSku} update={update} />
            <NumberInput label="Discount Quantity" field="discountQty" value={rule.discountQty}
                         changed={rule.discountQty !== originalRule.discountQty} update={update} />
            <NumberInput label="Discount (%)" field="discount" value={rule.discount}
                         changed={rule.discount !== originalRule.discount} update={update} />

            <div style={styles.priorityAndStackable}>
                <NumberInput label="Priority" field="priority" value={rule.priority}
                             changed={rule.priority !== originalRule.priority} update={update} />
                <StackableField rule={rule} originalRule={originalRule} update={update} />
            </div>
        </FormTemplate>
    )
}

const styles = {
    name: {
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column"
    },
    priorityAndStackable: {
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
    }
}