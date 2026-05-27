import {useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";

export function CartLoader({cart, setCart}) {
    const { theme } = useTheme();
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
            <button style={{
                ...styles.button,
                ...(theme === "dark" ? styles.buttonDark : styles.buttonLight)
            }} onClick={copyCart}>Copy cart</button>
            <button style={{
                ...styles.button,
                ...(theme === "dark" ? styles.buttonDark : styles.buttonLight)
            }} onClick={loadStandardCart}>Load standard cart</button>
            <textarea style={{
                ...styles.textarea,
                ...(theme === "dark" ? styles.textareaDark : styles.textareaLight)
            }}
                placeholder={"Paste cart JSON here..."}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}/>
            <button style={{
                ...styles.importButton,
                ...(theme === "dark" ? styles.importButtonDark : styles.importButtonLight)
            }} onClick={importCart}>Import cart</button>
        </div>
    );
}

const styles = {
    tools: {
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 10,
    },
    button: {
        border: "1px solid",
        padding: "6px 10px",
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    buttonDark: {
        background: "#333",
        borderColor: "#444",
        color: "#E0E0E0",
    },
    buttonLight: {
        background: "#e0e0e0",
        borderColor: "#bbb",
        color: "#000",
    },
    textarea: {
        marginTop: 10,
        width: "100%",
        height: 100,
        padding: 8,
        fontFamily: "monospace",
        borderRadius: 4,
        border: "1px solid",
        boxSizing: "border-box",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    textareaDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0",
    },
    textareaLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000",
    },
    importButton: {
        padding: "6px 12px",
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: "bold",
        border: "none",
        transition: "background 0.3s ease, color 0.3s ease",
    },
    importButtonDark: {
        background: "#BB86FC",
        color: "#fff",
    },
    importButtonLight: {
        background: "#5A2DA8",
        color: "#000",
    }
}
