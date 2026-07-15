import {useTheme} from "../theme/ThemeProvider";
import {tokens} from "../theme/tokens";

export function Layout({ children }) {
    const { theme, toggleTheme } = useTheme();
    const t = tokens[theme];

    return (
        <div style={{
            ...styles.container,
            background: t.background,
            color: t.text
        }}>
            <button onClick={toggleTheme} style={{
                ...styles.button,
                background: t.accent
            }}>
                {theme === "light" ? "Dark mode" : "Light mode"}
            </button>

            {children}
        </div>
    )
}

const styles = {
    container: {
        minHeight: "100vh",
        padding: "20px",
        transition: "background 0.3s, color 0.3s"
    },
    button: {
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        marginBottom: "20px",
        cursor: "pointer"
    }
}