import {useTheme} from "../../../ui/theme/ThemeProvider";
import {buttonStyles} from "./buttonStyles";

export function ButtonPanel({ children, status }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={styles.buttonPanel}>
            <button disabled={status === "loading"}
                style={{
                    ...buttonStyles.base,
                    ...(isDark ? buttonStyles.dark : buttonStyles.light)
                }}
            >
                {status === "loading" ? "Loading…" : "Load"}
            </button>

            {children}
        </div>
    )
}

const styles = {
    buttonPanel: {
        display: "flex",
        flexDirection: "column",
        gap: 15
    }
}