import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {Field, FieldGroup} from "./Fields";
import {templateStyles} from "./templateStyles";
import {getBorder} from "../changeHighlighting";

export function TextInput({ label, field, value, changed = false, width, update }) {
    return (
        <Field label={label} value={value ?? ""} changed={changed} width={width}
               onChange={(e) => update(field, e.target.value)} />
    )
}

export function NumberInput({ label, field, value, changed = false, width, disabled = false,
                                update }) {
    return (
        <Field type="number" label={label} value={value} changed={changed} width={width ?? 50} disabled={disabled}
               onChange={(e) => update(field, Number(e.target.value))} />
    )
}

export function StackableField({ rule, originalRule, update}) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let title = "StackableSelection";

    let changed = originalRule && (rule.stackable !== originalRule.stackable);
    let border = getBorder(isDark, changed);

    return (
        <FieldGroup label="Stackable">
            <select title={title} name={title}
                style={{
                    ...templateStyles.input,
                    ...(isDark ? templateStyles.inputDark : templateStyles.inputLight),
                    width: 55,
                    ...border
                }}
                value={rule.stackable ? "true" : "false"}
                onChange={(e) => update("stackable", e.target.value === "true")}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </FieldGroup>
    )
}