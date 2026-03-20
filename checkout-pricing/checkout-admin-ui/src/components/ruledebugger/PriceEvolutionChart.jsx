import {useState} from "react";

export function PriceEvolutionChart({ prices }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    if (!prices) {
        return (
            <div style={styles.priceEmpty}>
                No price evolution data available.
            </div>
        );
    }

    const width = 500;
    const height = 200;
    const padding = 30;
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    const points = prices.map((p, i) => {
        const x = padding + (i / (prices.length - 1)) * (width - padding * 2);
        const y = height - padding - ((p - min) / (max - min)) * (height - padding * 2);
        return { x, y, value: p };
    });

    const path = points.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <div style={styles.priceWrapper}>
            <h3 style={styles.priceHeader}>Price Evolution</h3>

            <svg width={width} height={height} style={styles.svg}>
                {/* Line */}
                <polyline
                    fill="none"
                    stroke="#BB86FC"
                    strokeWidth="2"
                    points={path}
                />

                {/* Points */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={hoverIndex === i ? 6 : 4}
                        fill={hoverIndex === i ? "#4caf50" : "#fff"}
                        stroke="#333"
                        strokeWidth="1"
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                    />
                ))}
            </svg>

            {/* Tooltip */}
            {hoverIndex !== null && (
                <div style={styles.tooltip}>
                    Step {hoverIndex + 1}: {prices[hoverIndex]}
                </div>
            )}

        </div>
    );
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
    svg: {
        background: "#111",
        borderRadius: 6,
        border: "1px solid #333",
    },
    tooltip: {
        marginTop: 10,
        padding: "6px 10px",
        background: "#333",
        borderRadius: 4,
        color: "#fff",
        fontSize: "0.85rem",
        display: "inline-block",
    },
    priceEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    },
}