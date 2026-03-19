export function ChainOverview({ steps }) {
    if (!steps) return null;

    return (
        <section style={styles.chainOverview}>
            <h3>Pricing Chain</h3>

            <ul style={styles.chainList}>
                {steps.map((s, i) => (
                    <li key={i} style={styles.chainItem}>
                        <div style={styles.chainIndex}>{i + 1}</div>

                        <div style={styles.chainContent}>
                            <div style={styles.chainStep}>{s.step}</div>
                            <div style={styles.chainDesc}>{s.description}</div>

                            <div style={styles.chainPrice}>
                                <span style={styles.priceBefore}>{s.priceBefore}</span>
                                <span style={styles.priceArrow}>→</span>
                                <span style={styles.priceAfter}>{s.priceAfter}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

const styles = {
    chainOverview: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },

    chainList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },

    chainItem: {
        display: "flex",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #333",
    },

    chainItemLast: {
        borderBottom: "none",
    },

    chainIndex: {
        width: 28,
        height: 28,
        background: "#333",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#aaa",
    },

    chainContent: {
        flex: 1,
    },

    chainStep: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#fff",
    },

    chainDesc: {
        fontSize: "0.85rem",
        color: "#bbb",
        marginTop: 2,
    },

    chainPrice: {
        marginTop: 6,
        fontSize: "0.9rem",
        color: "#ccc",
    },

    priceBefore: {
        color: "#f44336",
    },

    priceAfter: {
        color: "#4caf50",
    },

    priceArrow: {
        margin: "0 6px",
        color: "#888",
    },
};