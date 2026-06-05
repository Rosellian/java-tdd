import {AddSkuForm} from "./AddSkuForm";
import {CartLoader} from "./CartLoader";
import {RecentCarts} from "./recentcarts/RecentCarts";
import {useTheme} from "../../ui/ThemeProvider";

export function CartEditor({ cart, onChange }) {
    const { theme } = useTheme();

    function updateSku(sku, qty) {
        const next = { ...cart };
        if (qty <= 0) delete next[sku];
        else next[sku] = qty;
        onChange(next);
    }

    return (
        <div style={{
            ...styles.box,
            ...(theme === "dark" ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={{
                ...styles.title,
                ...(theme === "dark" ? styles.titleDark : styles.titleLight)
            }}>Cart</h3>

            <SkuRowList cart={cart} updateSku={updateSku} />

            <AddSkuForm onAdd={updateSku} />
            <RecentCarts cart={cart} setCart={onChange}/>
            <CartLoader cart={cart} setCart={onChange} />
        </div>
    );
}

function SkuRowList({ cart, updateSku }) {
    return (
        <div style={styles.listContainer}>
            {Object.entries(cart).map(([sku, qty]) => (
                <SkuRow sku={sku} qty={qty} update={updateSku} />
            ))}
        </div>
    )
}

function SkuRow({sku, qty, update}) {
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
    box: {
        padding: 15,
        borderRadius: 4,
        minWidth: 200,
        transition: "background 0.3s ease, color 0.3s ease",
    },
    boxDark: {
        background: "#1E1E1E",
        color: "#E0E0E0",
    },
    boxLight: {
        background: "#f5f5f5",
        color: "#000000",
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease",
    },
    titleDark: {
        color: "#80CBC4",
    },
    titleLight: {
        color: "#00796B",
    },
    listContainer: {
        maxHeight: "250px",
        overflowY: "auto",
        paddingRight: 4,
        display: "flex",
        flexDirection: "column",
    },
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