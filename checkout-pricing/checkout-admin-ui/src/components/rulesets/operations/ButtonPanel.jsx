import {useTheme} from "../../../ui/ThemeProvider";
import {buttonStyles} from "./buttonStyles";

export function ButtonPanel({ children, status }) {
    const { theme } = useTheme();

    return (
        <div style={styles.buttonPanel}>
            <button disabled={status === "loading"}
                style={{
                    ...buttonStyles.base,
                    ...(theme === "dark" ? buttonStyles.dark : buttonStyles.light)
                }}>{status === "loading" ? "Loading…" : "Load"}</button>
            {children}
        </div>
    )
}

const styles = {
    buttonPanel: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
    }
}