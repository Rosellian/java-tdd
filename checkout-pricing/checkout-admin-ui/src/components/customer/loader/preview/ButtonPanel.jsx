import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function ButtonPanel({ onCancel, onConfirm }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div style={styles.buttonRow}>
            <button onClick={onCancel}
                    style={{
                        ...styles.button,
                        ...(isDark ? styles.buttonCancelDark : styles.buttonCancelLight)
            }}>
                Cancel
            </button>

            <button onClick={onConfirm}
                    style={{
                        ...styles.button,
                        ...(isDark ? styles.buttonConfirmDark : styles.buttonConfirmLight)
            }}>
                Import
            </button>
        </div>
    )
}

const styles = {
    buttonRow: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 16
    },
    button: {
        padding: "6px 12px",
        borderRadius: 4,
        border: "1px solid",
        cursor: "pointer",
        fontSize: "0.85rem",
        transition: "background 0.2s ease, border-color 0.2s ease"
    },
    buttonCancelDark: {
        background: "#222",
        borderColor: "#444",
        color: "#eee"
    },
    buttonCancelLight: {
        background: "#eee",
        borderColor: "#ccc",
        color: "#222"
    },
    buttonConfirmDark: {
        background: "#4caf50",
        borderColor: "#4caf50",
        color: "#000"
    },
    buttonConfirmLight: {
        background: "#2e7d32",
        borderColor: "#2e7d32",
        color: "#fff"
    }
}