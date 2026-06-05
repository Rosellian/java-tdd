import {useTheme} from "../../ui/ThemeProvider";

export function ButtonPanel({ mode, status, handleSave, newPriceList }) {
    const { theme } = useTheme();

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

            <button disabled={mode === "new"} onClick={newPriceList}
                style={{
                    ...styles.button,
                    ...(theme === "dark" ? styles.newButtonDark : styles.newButtonLight)
                }}>+ New Price List</button>
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
    buttonDark: {
        background: "#BB86FC",
        color: "#fff",
    },
    buttonLight: {
        background: "#5A2DA8",
        color: "#000",
    },
    newButtonDark: {
        background: "#4CAF50",
        color: "#fff",
    },
    newButtonLight: {
        background: "#4CAF50",
        color: "#000",
    }
}