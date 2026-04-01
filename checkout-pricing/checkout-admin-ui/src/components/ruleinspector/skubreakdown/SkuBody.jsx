export function SkuBody({ sku }) {
    return (
        <div style={styles.skuBody}>
            <pre>{JSON.stringify(sku, null, 2)}</pre>
        </div>
    )
}

const styles = {
    skuBody: {
        padding: 10,
        background: "#1A1A1A",
    }
}