import {useTheme} from "../../theme/ThemeProvider";

export function ItemHeader({ label, open, setOpen, changed }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let changedBorder = changed ? "4px solid #FFB300" : "4px solid transparent";

    return (
        <div onClick={() => setOpen(!open)}
             style={{
                 ...styles.header,
                 ...(isDark ? styles.headerDark : styles.headerLight),
                 ...{borderLeft: changedBorder}
             }}>
            <span>{label}</span>

            <span style={styles.toggle}>{open ? "▼" : "▶"}</span>
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
        transition: "background 0.25s ease",
        cursor: "pointer"
    },
    headerDark: {
        background: "#2A2A2A",
        color: "#BB86FC"
    },
    headerLight: {
        background: "#eaeaea",
        color: "#5A2DA8"
    },
    toggle: {
        opacity: 0.8
    }
}