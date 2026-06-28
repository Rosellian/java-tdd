import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {RecentCartRow} from "../row/RecentCartRow";

export function RecentCartList({recent, onSelect, setOpen}) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.dropdownList,
            ...(isDark ? styles.listDark : styles.listLight)
        }}>
            {recent.map((cart, i) => (
                <RecentCartRow key={i} index={i} cart={cart}
                    onSelect={() => {
                        onSelect(cart);
                        setOpen(false);
                    }}
                />
            ))}
        </div>
    )
}
const styles = {
    dropdownList: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        marginTop: 4,
        borderRadius: 4,
        border: "1px solid",
        zIndex: 10,
        overflow: "visible",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    listDark: {
        background: "#1E1E1E",
        borderColor: "#444",
        color: "#E0E0E0"
    },
    listLight: {
        background: "#f5f5f5",
        borderColor: "#ccc",
        color: "#000000"
    }
}