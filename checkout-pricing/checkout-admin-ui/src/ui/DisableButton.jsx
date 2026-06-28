import {useTheme} from "./theme/ThemeProvider";

export function DisabledButton({ isDisabled, onClick, name }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <button disabled={isDisabled} onClick={onClick}
            style={{
                ...styles.button,
                ...(isDark ? styles.buttonDark : styles.buttonLight),
                ...(isDisabled ? styles.buttonDisabled : {})
        }}>
            {name}
        </button>
    )
}

const styles = {
    button: {
        display: "block",
        width: "100%",
        border: "none",
        padding: "14px 20px",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1rem",
        marginBottom: 12,
        transition: "background 0.2s"
    },
    buttonDark: {
        background: "#BB86FC",
        color: "#000"
    },
    buttonLight: {
        background: "#5A2DA8",
        color: "#fff"
    },
    buttonDisabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        background: "#555"
    }
}