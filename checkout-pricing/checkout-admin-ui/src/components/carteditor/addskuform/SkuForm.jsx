import {useTheme} from "../../../ui/theme/ThemeProvider";

export function SkuForm({ sku, setSku, qty, setQty }) {
    return (
        <div style={styles.wrapper}>
            <Input value={sku} onChange={(e) => setSku(e.target.value)} width={150}/>
            <Input type="number" value={qty}
                   onChange={(e) => setQty(Number(e.target.value))} width={50}/>
        </div>
    )
}

function Input({ type, value, onChange, width }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const name = type === "number" ? "SkuQuantity" : "Sku";
    const placeHolder = type !== "number" ? "SKU" : "0";

    return (
        <input type={type} value={value} name={name} placeholder={placeHolder} onChange={onChange}
               style={{
                   ...styles.input,
                   ...{width: width},
                   ...(isDark ? styles.inputDark : styles.inputLight)
        }}/>
    )
}

const styles = {
    wrapper: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    input: {
        border: "1px solid",
        padding: 5,
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    inputDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0"
    },
    inputLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000"
    }
}