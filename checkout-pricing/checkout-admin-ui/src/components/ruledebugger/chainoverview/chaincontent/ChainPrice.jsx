import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function ChainPrice({ step }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.chainPrice,
            ...(isDark ? styles.priceDark : styles.priceLight)
        }}>
            <span style={{
                ...styles.price,
                ...(isDark ? styles.beforeDark : styles.beforeLight)
            }}>
                {step.priceBefore}
            </span>

            <span style={{
                ...styles.priceArrow,
                ...(isDark ? styles.arrowDark : styles.arrowLight)
            }}>
                →
            </span>

            <span style={{
                ...styles.price,
                ...(isDark ? styles.afterDark : styles.afterLight)
            }}>
                {step.priceAfter}
            </span>
        </div>
    );
}

const styles = {
    chainPrice: {
        marginTop: 6,
        fontSize: "0.9rem",
        transition: "color 0.25s ease"
    },
    priceDark: {
        color: "#ccc"
    },
    priceLight: {
        color: "#444"
    },
    price: {
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    beforeDark: {
        color: "#ff6b6b"
    },
    beforeLight: {
        color: "#d32f2f"
    },
    afterDark: {
        color: "#66ff99"
    },
    afterLight: {
        color: "#2e7d32"
    },
    priceArrow: {
        margin: "0 6px",
        transition: "color 0.25s ease"
    },
    arrowDark: {
        color: "#888"
    },
    arrowLight: {
        color: "#666"
    }
}