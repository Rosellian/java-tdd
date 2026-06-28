import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {Badge} from "../Badge";

export function SkuHeader({ skuData, onClick }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div onClick={onClick} style={{
            ...styles.skuHeader,
            ...(isDark ? styles.headerDark : styles.headerLight)
        }}>
            <strong>
                {skuData.sku}
            </strong>

            <div style={styles.total}>
                <Badge type="total">
                    {skuData.total} kr
                </Badge>
            </div>
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
        borderBottom: "1px solid"
    },
    headerDark: {
        background: "#263238",
        color: "#80CBC4",
        borderColor: "#333"
    },
    headerLight: {
        background: "#e8f1f3",
        color: "#00695c",
        borderColor: "#ccc"
    },
    total: {
        display: "flex",
        gap: 6
    }
}