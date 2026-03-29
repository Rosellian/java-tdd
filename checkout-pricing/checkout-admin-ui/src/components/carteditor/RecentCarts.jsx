import React, {useEffect, useState} from "react";

export function RecentCarts({ cart, setCart}) {

    function useRecentCarts(cart) {
        const [recent, setRecent] = useState(() => {
            const saved = localStorage.getItem("recentCarts");
            return saved ? JSON.parse(saved) : [];
        });

        useEffect(() => {
            if(!cart || Object.keys(cart).length === 0) return;

            setRecent(prev => {
                const next = [cart, ...prev.filter(c => JSON.stringify(c) !== JSON.stringify(cart))];
                const trimmed = next.slice(0, 5);
                localStorage.setItem("recentCarts", JSON.stringify(trimmed));
                return trimmed;
            })
        }, [cart]);

        return recent;
    }

    const recent = useRecentCarts(cart);

    if (!recent) return null;

    return (
        <div style={styles.recentBox}>
            <h4 style={styles.recentTitle}>Recent carts</h4>
            <select style={styles.dropdown}
                onChange={(e) => {
                    const index = Number(e.target.value);
                    if(!isNaN(index)) setCart(recent[index]);
                }}
            >
                <option value="">Recent carts...</option>
                {recent.map((c, i) => (
                    <option key={i} value={i}>
                        #{i + 1} - {Object.keys(c).length} SKUs
                    </option>
                ))}
            </select>
        </div>
    );
}

const styles = {
    dropdown: {
        width: "100%",
        padding: "6px 10px",
        background: "#2A2A2A",
        border: "1px solid #444",
        color: "#E0E0E0",
        borderRadius: 4,
        cursor: "pointer",
    },
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