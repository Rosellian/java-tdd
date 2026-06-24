import {useState} from "react";
import {useTheme} from "../../../../../../ui/theme/ThemeProvider";

export function Tooltip({ text, children }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [hover, setHover] = useState(false);

    return (
        <span
            style={styles.container}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}

            {hover && (
                <div style={{
                    ...styles.tooltip,
                    ...(isDark ? styles.tooltipDark : styles.tooltipLight)
                }}>
                    {text}
                </div>
            )}
        </span>
    )
}

const styles = {
    container: {
        position: "relative",
        display: "inline-block"
    },
    tooltip: {
        position: "absolute",
        top: "120%",
        left: 0,
        zIndex: 50,
        padding: "6px 10px",
        borderRadius: 4,
        whiteSpace: "pre-wrap",
        maxWidth: 300,
        fontSize: "0.8rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
    },
    tooltipDark: {
        background: "#1E1E1E",
        border: "1px solid #444",
        color: "#eee"
    },
    tooltipLight: {
        background: "#fff",
        border: "1px solid #ccc",
        color: "#222"
    }
}