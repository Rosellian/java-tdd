import {useState} from "react";
import {useTheme} from "../../../ui/ThemeProvider";
import {SkuForm} from "./SkuForm";

export function AddSkuForm({ onAdd }) {
    const { theme } = useTheme();

    const [sku, setSku] = useState("");
    const [qty, setQty] = useState(1);

    function submit() {
        if (!sku) {
            return;
        }

        onAdd(sku, qty);
        setSku("");
        setQty(1);
    }

    return (
        <div style={styles.addRow}>
            <SkuForm sku={sku} setSku={setSku} qty={qty} setQty={setQty} />
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
    addButton: {
        border: "none",
        padding: "5px 10px",
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background 0.3s ease, color 0.3s ease",
    },
    addButtonDark: {
        background: "#4CAF50",
        color: "#fff",
    },
    addButtonLight: {
        background: "#4CAF50",
        color: "#000",
    }
}