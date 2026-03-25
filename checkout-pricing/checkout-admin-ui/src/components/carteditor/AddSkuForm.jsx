import {useState} from "react";

export function AddSkuForm({ onAdd }) {
    const [sku, setSku] = useState("");
    const [qty, setQty] = useState(1);

    function submit() {
        if (!sku) return;
        onAdd(sku, qty);
        setSku("");
        setQty(1);
    }

    return (
        <div style={styles.addRow}>
            <input
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                style={styles.input}
            />
            <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={styles.input}
            />
            <button style={styles.addButton} onClick={submit}>Add</button>
        </div>
    );
}

const styles = {
    input: {
        background: "#2A2A2A",
        border: "1px solid #333",
        color: "#E0E0E0",
        padding: 5,
        width: 60,
    },
    addRow: {
        marginTop: 10,
        display: "flex",
        gap: 5,
    },
    addButton: {
        background: "#03DAC6",
        border: "none",
        padding: "5px 10px",
        borderRadius: 4,
        cursor: "pointer",
        color: "#000",
    }
};