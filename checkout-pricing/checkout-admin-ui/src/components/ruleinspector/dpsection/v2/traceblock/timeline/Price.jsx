import {useTheme} from "../../../../../../ui/theme/ThemeProvider";

export function Price ({ label, node, prevPrice }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const priceColor = getPriceColor(prevPrice, node.price, isDark);

    return (
        <div style={styles.price}>
            <strong>{label}: </strong>

            <span style={{color: priceColor}}>
                {node.price}
            </span>
        </div>
    )
}

function getPriceColor(prev, current, isDark) {
    //TODO Maybe compare with full unit price alternative
    if (prev == null) return isDark ? "#ccc" : "#333";

    if (current < prev) return isDark ? "#4caf50" : "#2e7d32";

    if (current > prev) return "#d32f2f";

    return "#f9a825";
}

const styles = {
    price: {
        marginBottom: 6,
        fontWeight: 600
    }
}