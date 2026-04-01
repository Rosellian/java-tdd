export function SkuHeader({ sku, onClick }) {
    return (
        <div style={styles.skuHeader} onClick={onClick}>
            <strong>{sku.sku}</strong>
            <span>{sku.total} kr</span>
        </div>
    )
}

const styles = {
    skuHeader: {
        padding: 10,
        background: "#263238",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        color: "#80CBC4",
    }
}