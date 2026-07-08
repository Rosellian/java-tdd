import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {InputField} from "./InputField";

export function PriceRow({ item, originalItem, onChange, onDelete }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let isChanged = originalItem &&  item.price !== originalItem.price;

    return (
        <div style={styles.row}>
            <InputField placeholder="SKU" value={item.sku} onChange={(e) => onChange("sku", e.target.value)}/>

            <InputField placeholder="Price" type="number" value={item.price} width={50} isChanged={isChanged}
                        onChange={(e) => onChange("price", parseFloat(e.target.value))}/>

            <button onClick={onDelete}
                style={{
                    ...styles.deleteButton,
                    ...(isDark ? styles.deleteButtonDark : styles.deleteButtonLight)
            }}>
                ✕
            </button>
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        gap: 10,
        alignItems: "center"
    },
    deleteButton: {
        padding: "6px 10px",
        borderRadius: 4,
        border: "none",
        cursor: "pointer"
    },
    deleteButtonDark: {
        background: "#8B0000",
        color: "#fff"
    },
    deleteButtonLight: {
        background: "#ffdddd",
        color: "#900"
    }
}