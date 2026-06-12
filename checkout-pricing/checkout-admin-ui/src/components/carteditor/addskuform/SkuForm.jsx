import {useTheme} from "../../../ui/ThemeProvider";

export function SkuForm({ sku, setSku, qty, setQty }) {
    return (
        <div style={styles.wrapper}>
            <Input value={sku} onChange={(e) => setSku(e.target.value)}/>
            <Input type="number" value={qty}
                   onChange={(e) => setQty(Number(e.target.value))}/>
        </div>
    )
}

function Input({ type, value, onChange }) {
    const { theme } = useTheme();

    const placeHolder = type !== "number" ? "SKU" : "";

    return (
        <input type={type} value={value} placeholder={placeHolder} onChange={onChange}
               style={{
                   ...styles.input,
                   ...(theme === "dark" ? styles.inputDark : styles.inputLight)
        }}/>
    )
}

const styles = {
    wrapper: {
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
    }
}