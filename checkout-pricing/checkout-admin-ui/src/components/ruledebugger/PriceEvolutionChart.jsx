import {PriceGraph} from "./priceevolutionchart/PriceGraph";

const width = 500;
const height = 200;

export function PriceEvolutionChart({ prices }) {
    if (!prices) {
        return (
            <div style={styles.priceEmpty}>
                No price evolution data available.
            </div>
        );
    }

    const points = calculatePoints(prices);

    const path = points.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <div style={styles.priceWrapper}>
            <h3 style={styles.priceHeader}>Price Evolution</h3>

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
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
        position: "relative",
    },
    priceHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#fff",
    },
    priceEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    }
}