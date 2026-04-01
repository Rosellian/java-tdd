import {useState} from "react";

export function CartLoader({cart, setCart}) {
    const [importText, setImportText] = useState("");

    function copyCart() {
        const json = JSON.stringify(cart, null, 2);
        navigator.clipboard.writeText(json);
    }

    function importCart() {
        try {
            const parsed = JSON.parse(importText);
            if(typeof parsed !== "object" || Array.isArray(parsed)) {
                alert("Invalid cart format")
                return;
            }
            setCart(parsed);
        } catch (error) {
            alert("Invalid JSON");
        }
    }

    function loadStandardCart() {
        const defaultCart = {
            "A": 5,
            "B": 4,
            "C": 3,
            "D": 2,
            "E": 1
        };
        setCart(defaultCart);
    }

    return (
        <div style={styles.tools}>
            <button style={styles.button} onClick={copyCart}>Copy cart</button>
            <button style={styles.button} onClick={loadStandardCart}>Load standard cart</button>
            <textarea style={styles.textarea}
                placeholder={"Paste cart JSON here..."}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}/>
            <button style={styles.importButton} onClick={importCart}>Import cart</button>
        </div>
    );
}

const styles = {
    tools: {
        marginTop: 15,
        display: "flex",
        gap: 10,
    },
    button: {
        background: "#333",
        border: "1px solid #444",
        padding: "6px 10px",
        borderRadius: 4,
        cursor: "pointer",
        color: "#E0E0E0",
    },
    textarea: {
        marginTop: 10,
        width: "100%",
        height: 100,
        background: "#2A2A2A",
        border: "1px solid #333",
        color: "#E0E0E0",
        padding: 8,
        fontFamily: "monospace",
        borderRadius: 4,
    },
    importButton: {
        marginTop: 8,
        background: "#BB86FC",
        border: "none",
        padding: "6px 12px",
        borderRadius: 4,
        cursor: "pointer",
        color: "#000",
        fontWeight: "bold",
    }
}
