import {useTheme} from "../../../../ui/ThemeProvider";

export function RuleTypeSelector({ value, onChange }) {
    const { theme } = useTheme();

    return (
        <div style={styles.box}>
            <label style={styles.label}>Rule Type</label>

            <select value={value} onChange={(e) => onChange(e.target.value)}
                style={{
                    ...styles.select,
                    ...(theme === "dark" ? styles.selectDark : styles.selectLight)
                }}>
                <option value="SpecialPrice">Special Price</option>
                <option value="BuyXGetYFree">Buy X Get Y Free</option>
                <option value="BuyXGetYDiscount">Buy X Get Y at Discount</option>
                <option value="SkuDiscount">SKU Discount</option>
                <option value="CrossSkuBuyXGetYFree">Cross SKU Buy X Get Y Free</option>
                <option value="CrossSkuBuyXGetYDiscount">Cross SKU Buy X Get Y at Discount</option>
            </select>
        </div>
    )
}

const styles = {
    box: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 12
    },
    label: {
        fontSize: "0.9rem",
        color: "#82B1FF"
    },
    select: {
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid #444",
        fontSize: "0.95rem",
        transition: "background 0.3s ease, color 0.3s ease"
    },
    selectDark: {
        background: "#1E1E1E",
        color: "#E0E0E0"
    },
    selectLight: {
        background: "#FFFFFF",
        color: "#222"
    }
}