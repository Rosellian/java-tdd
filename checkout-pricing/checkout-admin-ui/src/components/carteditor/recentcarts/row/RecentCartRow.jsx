import {useState} from "react";
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {CartTooltip} from "./CartTooltip";

export function RecentCartRow({ index, cart, onSelect }) {
    const { theme } = useTheme();
    const [hover, setHover] = useState(false);

    return (
        <div style={{
            ...styles.dropdownItem,
            ...(theme === "dark" ? styles.itemDark : styles.itemLight),
            ...(hover ? (theme === "dark" ? styles.itemHoverDark : styles.itemHoverLight) : {})
        }}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onClick={onSelect}
        >
            #{index + 1} - {Object.keys(cart).length} SKUs

            {hover && <CartTooltip cart={cart} />}
        </div>
    )
}

const styles = {
    dropdownItem: {
        padding: "6px 10px",
        cursor: "pointer",
        borderBottom: "1px solid",
        position: "relative",
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
    },
    itemDark: {
        color: "#E0E0E0",
        borderColor: "#333",
        background: "transparent",
    },
    itemLight: {
        color: "#000000",
        borderColor: "#ccc",
        background: "transparent",
    },
    itemHoverDark: {
        background: "#333",
    },
    itemHoverLight: {
        background: "#e6e6e6",
    }
}