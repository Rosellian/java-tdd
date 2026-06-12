import {useTheme} from "../../../ui/ThemeProvider";
import {useState} from "react";
import {importCart} from "./loadingOps";

export function CartImporter({ setCart }) {
    const { theme } = useTheme();
    const [importText, setImportText] = useState("");

    return (
        <div style={styles.wrapper}>
            <textarea placeholder={"Paste cart JSON here..."} value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      style={{
                          ...styles.textarea,
                          ...(theme === "dark" ? styles.textareaDark : styles.textareaLight)
            }}/>
            <button onClick={() => importCart(importText, setCart)}
                    style={{
                        ...styles.importButton,
                        ...(theme === "dark" ? styles.importButtonDark : styles.importButtonLight)
            }}>Import cart</button>
        </div>
    )
}

const styles = {
    wrapper: {
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 10,
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
        background: "#D9C4FF",
        color: "#3A1F6B",
    }
}