import {useTheme} from "../../ui/ThemeProvider";
import {isProtectedRuleset} from "../../functions/protectedNames";

export function ButtonPanel({ mode, status, selected, handleSave, newRuleset, handleDelete }) {
    const { theme } = useTheme();

    const isProtectedSelected = theme === "light" && isProtectedRuleset(selected);

    return (
        <div style={styles.buttonPanel}>
            <button onClick={handleSave} disabled={status === "saving"}
                style={{
                    ...styles.button,
                    ...(theme === "dark" ? styles.buttonDark : styles.buttonLight)
                }}>{status === "saving" ? "Saving…" : "Save"}</button>

            <button disabled={status === "loading"}
                style={{
                    ...styles.button,
                    ...(theme === "dark" ? styles.buttonDark : styles.buttonLight)
                }}>{status === "loading" ? "Loading…" : "Load"}</button>

            <button disabled={mode === "new"} onClick={newRuleset}
                style={{
                    ...styles.button,
                    ...(theme === "dark" ? styles.newButtonDark : styles.newButtonLight)
                }}>+ New Ruleset</button>

            <button disabled={isProtectedSelected} onClick={handleDelete}
                    title={isProtectedSelected ? "This ruleset cannot be deleted" : ""}
                    style={{
                        ...styles.button,
                        ...(theme === "dark" ? styles.deleteButtonDark : styles.deleteButtonLight),
                        ...(isProtectedSelected ? styles.buttonDisabled : {})
                    }}>{status === "deleting" ? "Deleting…" : "Delete"}</button>
        </div>
    )
}

const styles = {
    buttonPanel: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
    },
    button: {
        padding: "6px 6px",
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
        width: "120px",
    },
    buttonDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    },
    buttonDark: {
        background: "#BB86FC",
        color: "#fff",
    },
    buttonLight: {
        background: "#D9C4FF",
        color: "#3A1F6B",
    },
    newButtonDark: {
        background: "#4CAF50",
        color: "#fff",
    },
    newButtonLight: {
        background: "#4CAF50",
        color: "#000",
    },
    deleteButtonDark: {
        background: "#8B0000",
        color: "#fff",
    },
    deleteButtonLight: {
        background: "#FFCCCC",
        color: "#660000",
    }
}