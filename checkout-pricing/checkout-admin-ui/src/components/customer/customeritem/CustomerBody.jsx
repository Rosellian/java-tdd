import {useTheme} from "../../../ui/theme/ThemeProvider";
import {generateSchema} from "../../../ui/json/jsonFunc";
import {EditableJsonItem} from "../../../ui/json/editableJsonItem/EditableJsonItem";

export function CustomerBody({ customer, updateField, originalCustomer }) {
    const { theme } = useTheme();

    const schema = generateSchema(customer);
    const fields = Object.keys(customer).map(key => ({
        key,
        label: key,
        value: customer[key],
        originalValue: originalCustomer[key],
        schema: schema[key],
        isPrimitive: typeof customer[key] !== "object" || customer[key] === null,
        changed: JSON.stringify(customer[key]) !== JSON.stringify(originalCustomer[key])
    }));

    return (
        <div
            style={{
                ...styles.body,
                ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
            }}
        >
            {fields.map(field => (
                <EditableJsonItem
                    key={field.key}
                    label={field.label}
                    value={field.value}
                    originalValue={field.originalValue}
                    schema={field.schema}
                    isPrimitive={field.isPrimitive}
                    changed={field.changed}
                    onChange={(v) => updateField(field.key, v)}
                />
            ))}
        </div>
    )
}

const styles = {
    body: {
        gap: 10,
        padding: 10,
        transition: "background 0.25s ease"
    },
    bodyDark: {
        background: "#1A1A1A",
        borderTop: "1px solid #333"
    },
    bodyLight: {
        background: "#ffffff",
        borderTop: "1px solid #ccc"
    }
}