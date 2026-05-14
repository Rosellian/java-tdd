export function ButtonPanel({ onAdd, onDelete }) {
    return (
        <div style={styles.buttonPanel}>
            <button style={styles.addButton} onClick={onAdd}>+ Add Rule</button>
            <button style={styles.deleteButton} onClick={onDelete}>Delete</button>
        </div>
    )
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
        background: "#4CAF50",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        color: "#fff",
    },
    deleteButton: {
        marginTop: 4,
        padding: "6px 10px",
        background: "#E53935",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        color: "#fff",
    }
}