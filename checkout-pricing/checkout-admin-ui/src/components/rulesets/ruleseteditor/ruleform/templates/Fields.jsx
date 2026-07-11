import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {templateStyles} from "./templateStyles";
import {getBorder} from "../changeHighlighting";

export function Field({ type, label, value, changed = false, width = 150, disabled = false,
                          onChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let title = `${label}Input`;

    let border = getBorder(isDark, changed)

    return (
        <FieldGroup label={label}>
            <input name={title} title={title}
                   style={{
                       ...templateStyles.input,
                       ...(isDark ? templateStyles.inputDark : templateStyles.inputLight),
                       width: width,
                       ...border
                   }}
                   disabled={disabled}
                   type={!type ? "text" : type}
                   min={type === "number" ? 0 : undefined}
                   value={value}
                   onChange={onChange}
            />
        </FieldGroup>
    )
}

export function FieldGroup({ label, children }) {
    return (
        <div style={styles.field}>
            <span style={styles.label}>{label}</span>
            <label>
                {children}
            </label>
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
    }
}