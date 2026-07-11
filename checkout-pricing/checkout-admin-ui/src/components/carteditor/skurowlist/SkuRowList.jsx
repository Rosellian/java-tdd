import {SkuRow} from "./SkuRow";

export function SkuRowList({ cart, updateSku }) {
    return (
        <div style={styles.listContainer}>
            {Object.entries(cart).map(([sku, qty]) => (
                <SkuRow key={sku} sku={sku} qty={qty} update={updateSku} />
            ))}
        </div>
    )
}

const styles = {
    listContainer: {
        maxHeight: "250px",
        overflowY: "auto",
        paddingRight: 4,
        display: "flex",
        flexDirection: "column"
    }
}