import {useTheme} from "../../../ui/theme/ThemeProvider";

export function EditableRow({ label, value, onChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let title = `${label}Input`;

    return (
        <div style={styles.row}>
            <strong style={styles.label}>{label}</strong>

            <input name={title} title={title} placeholder={title} value={value}
                   onChange={e => onChange(e.target.value)}
                   style={{
                       ...styles.input,
                       ...(isDark ? styles.inputDark : styles.inputLight)
            }}/>
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        marginTop: 6,
        marginBottom: 6
    },
    label: {
        width: 120
    },
    input: {
        flex: 1,
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid",
        fontSize: "0.9rem",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease"
    },
    inputDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444"
    },
    inputLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc"
    }
}