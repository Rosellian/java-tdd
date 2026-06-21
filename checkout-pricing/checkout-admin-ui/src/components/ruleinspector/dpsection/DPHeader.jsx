import {useTheme} from "../../../ui/theme/ThemeProvider";

export function DPHeader({ dp, onClick }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.dpHeader,
            ...(theme === "dark" ? styles.headerDark : styles.headerLight)
        }} onClick={onClick}>
            <strong>SKU {dp.sku}</strong>

            <span>Remaining: {dp.remaining}</span>
        </div>
    )
}

const styles = {
    dpHeader: {
        padding: 10,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        transition: "background 0.25s ease, color 0.25s ease",
        borderBottom: "1px solid"
    },
    headerDark: {
        background: "#2E3A59",
        color: "#82B1FF",
        borderColor: "#333"
    },
    headerLight: {
        background: "#e8ecf7",
        color: "#1a237e",
        borderColor: "#ccc"
    }
}