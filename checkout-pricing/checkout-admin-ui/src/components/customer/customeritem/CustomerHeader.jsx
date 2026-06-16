import {useTheme} from "../../../ui/theme/ThemeProvider";

export function CustomerHeader({ customer, onClick }) {
    const { theme } = useTheme();

    return (
        <div onClick={onClick}
             style={{
                 ...styles.header,
                 ...(theme === "dark" ? styles.headerDark : styles.headerLight)
             }}>
            <span>ID: {customer.id}</span>
        </div>
    )
}

const styles = {
    header: {
        minWidth: 290,
        boxSizing: "border-box",
        padding: "10px 10px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "1rem",
        fontWeight: 600,
        flexShrink: 0,
        transition: "background 0.25s ease, color 0.25s ease"
    },
    headerDark: {
        background: "#2A2A2A",
        color: "#BB86FC",
        borderBottom: "1px solid #333"
    },
    headerLight: {
        background: "#f0f0f0",
        color: "#5A2DA8",
        borderBottom: "1px solid #ccc"
    }
}