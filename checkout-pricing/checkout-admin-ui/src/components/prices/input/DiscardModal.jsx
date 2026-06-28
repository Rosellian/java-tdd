import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";

export function DiscardChangesModal({ onConfirm, onCancel }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <ConfirmModal confirmLabel="Discard" cancelLabel="Cancel"
                      confirmStyle={isDark ? styles.confirmDark : styles.confirmLight}
                      cancelStyle={isDark ? styles.cancelDark : styles.cancelLight}
                      onConfirm={onConfirm} onCancel={onCancel}
        >
            <div style={styles.message}>
                You have unsaved changes
            </div>
            <div>
                Do you want to discard them and continue?
            </div>
        </ConfirmModal>
    )
}

const styles = {
    confirmDark: {
        background: "#B71C1C",
        color: "#fff"
    },
    confirmLight: {
        background: "#FFCDD2",
        color: "#B71C1C"
    },
    cancelDark: {
        background: "#555",
        color: "#fff"
    },
    cancelLight: {
        background: "#ddd",
        color: "#333"
    },
    message: {
        fontWeight: 600,
        marginBottom: 8
    }
}