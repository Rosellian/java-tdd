import {ThemeToggleButton} from "../ui/ThemeToggleButton";
import {useTheme} from "../ui/ThemeProvider";

export function ButtonPanel({ cart, ruleset, priceList, getTrace }) {
    const isDisabled = Object.keys(cart).length === 0;

    return (
        <div style={styles.buttons}>
            <DisabledButton isDisabled={isDisabled} onClick={() => getTrace(cart, ruleset, priceList)} name="Evaluate" />
            <ThemeToggleButton />
        </div>
    );
}

function DisabledButton({ isDisabled, onClick, name }) {
    const { theme } = useTheme();

    return (
        <button
            style={{
                ...styles.button,
                ...(theme === "dark" ? styles.buttonDark : styles.buttonLight),
                ...(isDisabled ? styles.buttonDisabled : {})
            }}
            disabled={isDisabled}
            onClick={onClick}>
            {name}
        </button>
    )
}

const styles = {
    buttons: {
        marginBottom: 40,
    },
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
        transition: "background 0.2s",
    },
    buttonDark: {
        background: "#BB86FC",
        color: "#000",
    },
    buttonLight: {
        background: "#5A2DA8",
        color: "#fff",
    },
    buttonDisabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        background: "#555",
    }
}