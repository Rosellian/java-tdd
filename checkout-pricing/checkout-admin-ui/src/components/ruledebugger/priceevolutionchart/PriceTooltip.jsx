export function PriceTooltip({ prices, hoverIndex }) {
    return (
        <div style={styles.tooltip}>
            Step {hoverIndex + 1}: {prices[hoverIndex]}
        </div>
    )
}

const styles = {
    tooltip: {
        marginTop: 10,
        padding: "6px 10px",
        background: "#333",
        borderRadius: 4,
        color: "#fff",
        fontSize: "0.85rem",
        display: "inline-block",
    }
}