import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function BlockHeader({ dp, open, setOpen }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div onClick={() => setOpen(!open)}
             style={{
                 ...styles.header,
                 ...(isDark ? styles.headerDark : styles.headerLight)
             }}>
            <span>SKU {dp.sku}</span>

            <span style={styles.toggle}>{open ? "▲" : "▼"}</span>
        </div>
    )
}

const styles = {
    header: {
        padding: "8px 12px",
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 600
    },
    headerDark: {
        color: "#BB86FC"
    },
    headerLight: {
        color: "#5A2DA8"
    },
    toggle: {
        opacity: 0.7
    }
}