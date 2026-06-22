import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function TextInput({ label, field, value, update, width }) {
    return (
        <Field label={label} value={value ?? ""} width={width}
               onChange={(e) => update(field, e.target.value)} />
    )
}

export function NumberInput({ label, field, value, update, width }) {
    return (
        <Field type="number" label={label} value={value} width={width ?? 50}
               onChange={(e) => update(field, Number(e.target.value))} />
    )
}

export function StackableField({ rule, update}) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <FieldGroup label="Stackable">
            <select
                style={{
                    ...styles.input,
                    ...(isDark ? styles.inputDark : styles.inputLight),
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

function Field({ type, label, value, onChange, width = 150 }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <FieldGroup label={label}>
            <input
                style={{
                    ...styles.input,
                    ...(isDark ? styles.inputDark : styles.inputLight),
                    width: width
                }}
                type={!type ? "text" : type}
                min={type === "number" ? 0 : undefined}
                value={value}
                onChange={onChange}
            />
        </FieldGroup>
    )
}

function FieldGroup({ label, children }) {
    return (
        <div style={styles.field}>
            <label style={styles.label}>{label}</label>

            {children}
        </div>
    )
}

const styles = {
    field: {
        display: "flex",
        flexDirection: "column"
    },
    label: {
        marginBottom: 4,
        fontSize: "0.85rem",
        whiteSpace: "nowrap",
        opacity: 0.8
    },
    input: {
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    inputDark: {
        background: "#1E1E1E",
        borderColor: "#444",
        color: "#E0E0E0"
    },
    inputLight: {
        background: "#FFFFFF",
        borderColor: "#CCC",
        color: "#000000"
    }
}