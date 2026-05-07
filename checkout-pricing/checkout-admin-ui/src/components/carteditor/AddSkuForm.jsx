import {useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";

export function AddSkuForm({ onAdd }) {
    const { theme } = useTheme();
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
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />
            <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />
            <button style={{
                ...styles.addButton,
                ...(theme === "dark" ? styles.addButtonDark : styles.addButtonLight)
            }} onClick={submit}>Add</button>
        </div>
    );
}

const styles = {
    addRow: {
        marginTop: 10,
        display: "flex",
        gap: 5,
    },
    input: {
        border: "1px solid",
        padding: 5,
        width: 60,
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    inputDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0",
    },
    inputLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000",
    },
    addButton: {
        border: "none",
        padding: "5px 10px",
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background 0.3s ease, color 0.3s ease",
    },
    addButtonDark: {
        background: "#03DAC6",
        color: "#000",
    },
    addButtonLight: {
        background: "#00897B",
        color: "#fff",
    }
}