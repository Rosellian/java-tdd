export function DPHeader({ dp, onClick }) {
    return (
        <div style={styles.dpHeader} onClick={onClick}>
            <strong>SKU {dp.sku}</strong>
            <span>Remaining: {dp.remaining}</span>
        </div>
    )
}

const styles = {
    dpHeader: {
        padding: 10,
        background: "#2E3A59",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        color: "#82B1FF",
    }
}