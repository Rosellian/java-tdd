import {PriceGraph} from "./priceevolutionchart/PriceGraph";
import {useTheme} from "../../ui/ThemeProvider";

const width = 500;
const height = 200;

export function PriceEvolutionChart({ prices }) {
    const { theme } = useTheme();

    if (!prices) {
        return (
            <div style={{
                ...styles.priceEmpty,
                ...(theme === "dark" ? styles.emptyDark : styles.emptyLight)
            }}>
                No price evolution data available.
            </div>
        );
    }

    const points = calculatePoints(prices);

    const path = points.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <div style={{
            ...styles.priceWrapper,
            ...(theme === "dark" ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <h3 style={{
                ...styles.priceHeader,
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>Price Evolution</h3>

            <PriceGraph prices={prices} path={path} points={points} />
        </div>
    );
}

function calculatePoints(prices) {
    const padding = 30;
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    return prices.map((p, i) => {
        const x = padding + (i / (prices.length - 1)) * (width - padding * 2);
        const y = height - padding - ((p - min) / (max - min)) * (height - padding * 2);
        return {x, y, value: p};
    });
}

const styles = {
    priceWrapper: {
        padding: 16,
        borderRadius: 8,
        position: "relative",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    wrapperDark: {
        background: "#1a1a1a",
        color: "#eee",
    },
    wrapperLight: {
        background: "#f5f5f5",
        color: "#222",
    },
    priceHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    headerDark: {
        color: "#fff",
    },
    headerLight: {
        color: "#3A1F6B",
    },
    priceEmpty: {
        padding: 16,
        borderRadius: 8,
        fontStyle: "italic",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    emptyDark: {
        background: "#1a1a1a",
        color: "#777",
    },
    emptyLight: {
        background: "#fafafa",
        color: "#666",
    }
}