import {useTheme} from "../../../../../../ui/theme/ThemeProvider";

export function Price ({ label, node, beforePrice }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const priceColor = getPriceColor(beforePrice, node.price, isDark);

    return (
        <div style={styles.price}>
            <strong>{label}: </strong>

            <span style={{color: priceColor}}>
                {node.price}
            </span>
        </div>
    )
}

function getPriceColor(before, current, isDark) {
    if (before == null) return isDark ? "#ccc" : "#333";

    if (current < before) return isDark ? "#4caf50" : "#2e7d32";

    if (current > before) return "#d32f2f";

    return "#f9a825";
}

const styles = {
    price: {
        marginBottom: 6,
        fontWeight: 600
    }
}