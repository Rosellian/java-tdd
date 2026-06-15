import {useTheme} from "../../../ui/theme/ThemeProvider";

export function SkuRow({sku, qty, update}) {
    const { theme } = useTheme();

    return (
        <div key={sku} style={styles.row}>
            <span>{sku}</span>
            <input
                type="number" value={qty}
                onChange={(e) => update(sku, Number(e.target.value))}
                style={{
                    ...styles.input,
                    ...(theme === "dark" ? styles.inputDark : styles.inputLight)
                }}
            />
        </div>
    );
}

const styles = {
    row: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
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