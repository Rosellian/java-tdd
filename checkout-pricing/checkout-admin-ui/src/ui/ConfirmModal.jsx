export function ConfirmModal({ message, onConfirm, onCancel, theme }) {
    return (
        <div style={styles.overlay}>
            <div style={{
                ...styles.modal,
                ...(theme === "dark" ? styles.modalDark : styles.modalLight)
            }}>
                <div style={styles.message}>{message}</div>

                <div style={styles.buttons}>
                    <button style={styles.cancel} onClick={onCancel}>Cancel</button>
                    <button style={styles.confirm} onClick={onConfirm}>Save</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    },
    modal: {
        padding: 20,
        borderRadius: 6,
        minWidth: 280,
        transition: "background 0.3s ease",
    },
    modalDark: {
        background: "#222",
        color: "#fff",
    },
    modalLight: {
        background: "#fff",
        color: "#000",
    },
    message: {
        marginBottom: 20,
        fontSize: 16,
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
    },
    cancel: {
        padding: "6px 12px",
        background: "#777",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        color: "#fff",
    },
    confirm: {
        padding: "6px 12px",
        background: "#4CAF50",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        color: "#fff",
    }
}