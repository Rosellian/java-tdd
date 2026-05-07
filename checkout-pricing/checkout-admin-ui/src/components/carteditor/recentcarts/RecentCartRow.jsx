import {useState} from "react";
import {useTheme} from "../../../ui/ThemeProvider";

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
    );
}

function CartTooltip({ cart }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.tooltip,
            ...(theme === "dark" ? styles.tooltipDark : styles.tooltipLight)
        }}>
            <pre  style={{
                ...styles.tooltipPre,
                ...(theme === "dark" ? styles.tooltipPreDark : styles.tooltipPreLight)
            }}>
                {JSON.stringify(cart, null, 2)}
            </pre>
        </div>
    );
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
    },
    tooltip: {
        position: "absolute",
        left: "105%",
        top: 0,
        padding: 10,
        borderRadius: 4,
        whiteSpace: "pre",
        zIndex: 20,
        minWidth: 200,
        border: "1px solid",
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
    },
    tooltipDark: {
        background: "#2A2A2A",
        borderColor: "#444",
    },
    tooltipLight: {
        background: "#ffffff",
        borderColor: "#ccc",
    },
    tooltipPre: {
        margin: 0,
        fontSize: "0.8rem",
        transition: "color 0.2s ease",
    },
    tooltipPreDark: {
        color: "#BB86FC",
    },
    tooltipPreLight: {
        color: "#5A2DA8",
    }
}