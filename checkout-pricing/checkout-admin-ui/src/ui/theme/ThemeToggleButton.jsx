import {useTheme} from "./ThemeProvider";

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            style={{
                ...styles.button,
                background: theme === "dark" ? "#444" : "#ddd",
                color: theme === "dark" ? "#fff" : "#000",
            }}
            onClick={toggleTheme}
        >
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
        transition: "background 0.2s",
    }
}