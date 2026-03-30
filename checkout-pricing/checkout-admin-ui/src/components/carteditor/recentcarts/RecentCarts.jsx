import {useRecentCarts} from "./useRecentCarts";
import {RecentCartsDropdown} from "./RecentCartsDropdown";

export function RecentCarts({ cart, setCart}) {
    const recent = useRecentCarts(cart);

    if (!recent) return null;

    return (
        <div style={styles.recentBox}>
            <h4 style={styles.recentTitle}>Recent carts</h4>
            <RecentCartsDropdown
                recent={recent}
                onSelect={setCart}
            />
        </div>
    );
}

const styles = {
    recentBox: {
        marginTop: 15,
        padding: 10,
        background: "#2A2A2A",
        borderRadius: 4,
    },
    recentTitle: {
        color: "#BB86FC",
        marginBottom: 8,
    }
};