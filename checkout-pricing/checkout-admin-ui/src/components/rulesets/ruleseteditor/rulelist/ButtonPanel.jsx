import {useTheme} from "../../../../ui/ThemeProvider";

export function ButtonPanel({ onAdd, onDelete }) {
    const { theme } = useTheme();

    return (
        <div style={styles.buttonPanel}>
            <button
                style={{
                    ...styles.addButton,
                    ...(theme === "dark" ? styles.addButtonDark : styles.addButtonLight)
                }}
                onClick={onAdd}
            >
                + Add Rule
            </button>

            <button
                style={{
                    ...styles.deleteButton,
                    ...(theme === "dark" ? styles.deleteButtonDark : styles.deleteButtonLight)
                }}
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
}

const styles = {
    buttonPanel: {
        display: "flex",
        gap: 15,
        marginTop: 10,
    },
    addButton: {
        marginTop: 4,
        padding: "6px 10px",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        transition: "background 0.3s ease, color 0.3s ease",
    },
    addButtonLight: {
        background: "#4CAF50",
        color: "#000",
    },
    addButtonDark: {
        background: "#66BB6A",
        color: "#fff",
    },
    deleteButton: {
        marginTop: 4,
        padding: "6px 10px",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        transition: "background 0.3s ease, color 0.3s ease",
    },
    deleteButtonLight: {
        background: "#E53935",
        color: "#000",
    },
    deleteButtonDark: {
        background: "#D32F2F",
        color: "#fff",
    },
}