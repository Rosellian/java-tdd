import {AddSkuForm} from "./addskuform/AddSkuForm";
import {CartLoader} from "./cartloader/CartLoader";
import {RecentCarts} from "./recentcarts/RecentCarts";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {SkuRowList} from "./skurowlist/SkuRowList";

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
            <div style={styles.column}>
                <h3 style={{
                    ...styles.title,
                    ...(theme === "dark" ? styles.titleDark : styles.titleLight)
                }}>
                    Cart
                </h3>

                <SkuRowList cart={cart} updateSku={updateSku} />

                <AddSkuForm onAdd={updateSku} />
            </div>

            <div style={styles.column}>
                <RecentCarts cart={cart} setCart={onChange}/>

                <CartLoader cart={cart} setCart={onChange} />
            </div>
        </div>
    )
}

const styles = {
    box: {
        display: "grid",
        gridTemplateColumns: "1fr 250px",
        alignItems: "flex-start",
        padding: 15,
        gap: 16,
        borderRadius: 4,
        transition: "background 0.3s ease, color 0.3s ease"
    },
    boxDark: {
        background: "#1E1E1E",
        color: "#E0E0E0"
    },
    boxLight: {
        background: "#f5f5f5",
        color: "#000000"
    },
    title: {
        marginBottom: 10,
        transition: "color 0.3s ease"
    },
    titleDark: {
        color: "#80CBC4"
    },
    titleLight: {
        color: "#00796B"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
}