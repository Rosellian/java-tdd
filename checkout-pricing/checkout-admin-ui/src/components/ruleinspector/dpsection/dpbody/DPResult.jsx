import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function DPResult({ dp }) {
    const { theme } = useTheme();

    return (
        <div style={{ marginTop: 10 }}>
            <h4 style={theme === "dark" ? styles.h4Dark : styles.h4Light}>Winning Path</h4>
            <pre style={{
                ...styles.pre,
                ...(theme === "dark" ? styles.preDark : styles.preLight)
            }}>{dp.winningPath.join("\n")}</pre>

            <h4 style={theme === "dark" ? styles.h4Dark : styles.h4Light}>Total</h4>
            <div>{dp.finalPrice} kr</div>
        </div>
    )
}

const styles = {
    h4Dark: {
        color: "#BB86FC",
        marginTop: 10,
    },
    h4Light: {
        color: "#5A2DA8",
        marginTop: 10,
    },
    pre: {
        marginTop: 6,
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333",
    },
    preLight: {
        background: "#f5f5f5",
        color: "#333",
        borderColor: "#ddd",
    }
}