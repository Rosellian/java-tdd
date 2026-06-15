import {useTheme} from "../../../ui/theme/ThemeProvider";

export function EditableRow({ label, value, onChange }) {
    const { theme } = useTheme();

    return (
        <div style={styles.row}>
            <strong style={{ width: 120 }}>{label}</strong>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        marginTop: 6,
        marginBottom: 6,
    },
    input: {
        flex: 1,
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid",
        fontSize: "0.9rem",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
    },
    inputDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444",
    },
    inputLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc",
    }
}