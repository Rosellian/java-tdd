export function PriceEvolutionChart({ prices }) {
    if (!prices) {
        return (
            <div style={styles.priceEmpty}>
                No price evolution data available.
            </div>
        );
    }

    return (
        <div style={styles.priceWrapper}>
            <h3 style={styles.priceHeader}>Price Evolution</h3>

            <ul style={styles.priceList}>
                {prices.map((p, i) => (
                    <li key={i} style={styles.priceItem}>
                        <span style={styles.priceStep}>Step {i + 1}</span>
                        <span style={styles.priceValue}>{p}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    chartPlaceholder: {
        display: "flex",
        gap: 4,
    },
    priceWrapper: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },
    priceHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#fff",
    },
    priceList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    priceItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid #333",
    },
    priceStep: {
        color: "#BB86FC",
    },
    priceValue: {
        color: "#4caf50",
        fontWeight: 600,
    },
    priceEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    },
}