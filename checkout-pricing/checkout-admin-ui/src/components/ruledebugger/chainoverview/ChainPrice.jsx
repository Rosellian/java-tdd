export function ChainPrice({ step }) {
    return (
        <div style={styles.chainPrice}>
            <span style={styles.priceBefore}>{step.priceBefore}</span>
            <span style={styles.priceArrow}>→</span>
            <span style={styles.priceAfter}>{step.priceAfter}</span>
        </div>
    );
}

const styles = {
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
    }
}