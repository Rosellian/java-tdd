import {useState} from "react";

export function RecentCartRow({ index, cart, onSelect }) {
    const [hover, setHover] = useState(false);

    return (
        <div style={styles.dropdownItem}
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
    return (
        <div style={styles.tooltip}>
            <pre style={styles.tooltipPre}>
                {JSON.stringify(cart, null, 2)}
            </pre>
        </div>
    );
}

const styles = {
    dropdownItem: {
        padding: "6px 10px",
        cursor: "pointer",
        color: "#E0E0E0",
        borderBottom: "1px solid #333",
        position: "relative",
    },
    tooltip: {
        position: "absolute",
        left: "105%",
        top: 0,
        background: "#2A2A2A",
        border: "1px solid #444",
        padding: 10,
        borderRadius: 4,
        whiteSpace: "pre",
        zIndex: 20,
        minWidth: 200,
    },
    tooltipPre: {
        margin: 0,
        color: "#BB86FC",
        fontSize: "0.8rem",
    }
}