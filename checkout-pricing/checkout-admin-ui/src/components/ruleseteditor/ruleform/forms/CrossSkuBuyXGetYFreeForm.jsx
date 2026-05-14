import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, StackableField, TextInput} from "../templates/FormFields";

export function CrossSkuBuyXGetYFreeForm({ rule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Cross SKU Buy X Get Y Free">
            <div style={styles.name}>
                <TextInput label="Name" field="name" value={rule.name} update={update} />
            </div>

            <TextInput label="Buy SKU" field="buySku" value={rule.buySku} update={update} />
            <NumberInput label="Buy Quantity" field="buyQty" value={rule.buyQty} update={update} />

            <TextInput label="Free SKU" field="freeSku" value={rule.freeSku} update={update} />
            <NumberInput label="Free Quantity" field="freeQty" value={rule.freeQty} update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority} update={update} />
            <StackableField rule={rule} update={update} />
        </FormTemplate>
    )
}

const styles = {
    name: {
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column"
    }
}