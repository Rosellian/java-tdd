import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function SkuHeader({ skuData, onClick }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.skuHeader,
            ...(theme === "dark" ? styles.headerDark : styles.headerLight)
        }} onClick={onClick}>
            <strong>{skuData.sku}</strong>
            <span>{skuData.total} kr</span>
        </div>
    )
}

const styles = {
    skuHeader: {
        padding: 10,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        transition: "background 0.25s ease, color 0.25s ease",
        borderBottom: "1px solid",
    },
    headerDark: {
        background: "#263238",
        color: "#80CBC4",
        borderColor: "#333",
    },
    headerLight: {
        background: "#e8f1f3",
        color: "#00695c",
        borderColor: "#ccc",
    }
}