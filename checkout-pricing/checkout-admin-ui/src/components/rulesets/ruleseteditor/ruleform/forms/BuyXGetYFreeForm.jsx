import {FormTemplate} from "../templates/FormTemplate";
import {NumberInput, StackableField, TextInput} from "../templates/FormFields";
import {isChanged} from "../changeHighlighting";

export function BuyXGetYFreeForm({ rule, originalRule, onChange }) {

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <FormTemplate title="Buy X Get Y Free">
            <TextInput label="Name" field="name" value={rule.name} changed={isChanged(rule, originalRule, "name")}
                       update={update} />
            <TextInput label="SKU" field="sku" value={rule.sku} changed={isChanged(rule, originalRule, "sku")}
                       update={update} />

            <NumberInput label="Buy" field="buy" value={rule.buy} changed={isChanged(rule, originalRule, "buy")}
                         update={update} />
            <NumberInput label="Get" field="get" value={rule.get} changed={isChanged(rule, originalRule, "get")}
                         update={update} />

            <NumberInput label="Priority" field="priority" value={rule.priority}
                         changed={isChanged(rule, originalRule, "priority")} update={update} />
            <StackableField rule={rule} originalRule={originalRule} update={update} />
        </FormTemplate>
    )
}