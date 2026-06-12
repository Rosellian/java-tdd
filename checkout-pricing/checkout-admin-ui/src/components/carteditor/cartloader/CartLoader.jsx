import {useTheme} from "../../../ui/ThemeProvider";
import {CartImporter} from "./CartImporter";
import {copyCart, loadStandardCart} from "./loadingOps";

export function CartLoader({cart, setCart}) {
    const { theme } = useTheme();

    return (
        <div style={styles.tools}>
            <button onClick={() => copyCart(cart)}
                    style={{
                        ...styles.button,
                        ...(theme === "dark" ? styles.buttonDark : styles.buttonLight)
            }}>Copy cart</button>
            <button onClick={() => loadStandardCart(setCart)}
                    style={{
                        ...styles.button,
                        ...(theme === "dark" ? styles.buttonDark : styles.buttonLight)
            }}>Load standard cart</button>
            <CartImporter setCart={setCart} />
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
    }
}
