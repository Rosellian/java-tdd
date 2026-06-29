import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function RuleTypeSelector({ value, onChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let title = "RuleTypeSelection";

    return (
        <div style={styles.box}>
            <span style={{
                ...styles.label,
                ...(isDark ? styles.labelDark : styles.labelLight)
            }}>
                Rule Type
            </span>

            <label>
                <select title={title} name={title} value={value}
                        onChange={(e) => onChange(e.target.value)}
                        style={{
                            ...styles.select,
                            ...(isDark ? styles.selectDark : styles.selectLight)
                        }}>
                    <option value="SpecialPrice">Special Price</option>
                    <option value="BuyXGetYFree">Buy X Get Y Free</option>
                    <option value="BuyXGetYDiscount">Buy X Get Y at Discount</option>
                    <option value="SkuDiscount">SKU Discount</option>
                    <option value="CrossSkuBuyXGetYFree">Cross SKU Buy X Get Y Free</option>
                    <option value="CrossSkuBuyXGetYDiscount">Cross SKU Buy X Get Y at Discount</option>
                </select>
            </label>
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
        fontSize: "0.9rem"
    },
    labelDark: {
        color: "#82B1FF"
    },
    labelLight: {
        color: "#5A2DA8"
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