import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function ChainIndex({ index, isActive }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.chainIndex,
            ...(isDark ? styles.indexDark : styles.indexLight),
            ...getActiveIndexStyle(isActive, isDark)
        }}>
            {index + 1}
        </div>
    )
}

function getActiveIndexStyle(isActive, isDark) {
    return isActive ?
        isDark ? styles.indexActiveDark : styles.indexActiveLight
        : {};
}

const styles = {
    chainIndex: {
        width: 28,
        height: 28,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    indexDark: {
        background: "#333",
        color: "#aaa"
    },
    indexLight: {
        background: "#ddd",
        color: "#555"
    },
    indexActiveDark: {
        background: "#4caf50",
        color: "#fff"
    },
    indexActiveLight: {
        background: "#2e7d32",
        color: "#fff"
    }
}