import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {Field, FieldGroup} from "./Fields";
import {templateStyles} from "./templateStyles";

export function TextInput({ label, field, value, update, width }) {
    return (
        <Field label={label} value={value ?? ""} width={width}
               onChange={(e) => update(field, e.target.value)} />
    )
}

export function NumberInput({ label, field, value, update, width, disabled = false }) {
    return (
        <Field type="number" label={label} value={value} width={width ?? 50}
               onChange={(e) => update(field, Number(e.target.value))} disabled={disabled} />
    )
}

export function StackableField({ rule, update}) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let title = "StackableSelection";

    return (
        <FieldGroup label="Stackable">
            <select title={title} name={title}
                style={{
                    ...templateStyles.input,
                    ...(isDark ? templateStyles.inputDark : templateStyles.inputLight),
                    width: 55
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