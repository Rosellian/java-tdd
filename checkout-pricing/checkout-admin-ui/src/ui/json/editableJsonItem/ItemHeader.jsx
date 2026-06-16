import {useTheme} from "../../theme/ThemeProvider";

export function ItemHeader({ label, open, setOpen, changed }) {
    const { theme } = useTheme();

    return (
        <div onClick={() => setOpen(!open)}
             style={{
                 ...styles.header,
                 ...(theme === "dark" ? styles.headerDark : styles.headerLight),
                 borderLeft: changed ? "4px solid #FFB300" : "4px solid transparent",
                 cursor: "pointer"
             }}>
            <span>{label}</span>
            <span style={{ opacity: 0.8 }}>{open ? "▼" : "▶"}</span>
        </div>
    )
}

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 4px",
        borderRadius: 4,
        fontWeight: 600,
        transition: "background 0.25s ease"
    },
    headerDark: {
        background: "#2A2A2A",
        color: "#BB86FC"
    },
    headerLight: {
        background: "#eaeaea",
        color: "#5A2DA8"
    }
}