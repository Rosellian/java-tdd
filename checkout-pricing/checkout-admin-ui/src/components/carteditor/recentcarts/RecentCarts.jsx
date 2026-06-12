import {useRecentCarts} from "./useRecentCarts";
import {RecentCartsDropdown} from "./dropdown/RecentCartsDropdown";
import {useTheme} from "../../../ui/ThemeProvider";

export function RecentCarts({ cart, setCart}) {
    const { theme } = useTheme();
    const recent = useRecentCarts(cart);

    if (!recent) return null;

    return (
        <div style={{
            ...styles.recentBox,
            ...(theme === "dark" ? styles.recentBoxDark : styles.recentBoxLight)
        }}>
            <h4 style={{
                ...styles.recentTitle,
                ...(theme === "dark" ? styles.recentTitleDark : styles.recentTitleLight)
            }}>Recent carts</h4>
            <RecentCartsDropdown recent={recent} onSelect={setCart}/>
        </div>
    );
}

const styles = {
    recentBox: {
        marginTop: 15,
        padding: 10,
        borderRadius: 4,
        transition: "background 0.3s ease, color 0.3s ease",
    },
    recentBoxDark: {
        background: "#2A2A2A",
        color: "#E0E0E0",
    },
    recentBoxLight: {
        background: "#f2f2f2",
        color: "#000000",
    },
    recentTitle: {
        marginBottom: 8,
        transition: "color 0.3s ease",
    },
    recentTitleDark: {
        color: "#BB86FC",
    },
    recentTitleLight: {
        color: "#5A2DA8",
    }
}