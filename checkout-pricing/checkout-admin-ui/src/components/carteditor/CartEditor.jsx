import React, {useState} from "react";
import {AddSkuForm} from "./AddSkuForm";
import {CartLoader} from "./CartLoader";

export function CartEditor({ cart, onChange }) {

    function updateSku(sku, qty) {
        const next = { ...cart };
        if (qty <= 0) delete next[sku];
        else next[sku] = qty;
        onChange(next);
    }

    return (
        <div style={styles.box}>
            <h3 style={styles.title}>Cart</h3>

            {Object.entries(cart).map(([sku, qty]) => (
                <div key={sku} style={styles.row}>
                    <span>{sku}</span>
                    <input
                        type="number"
                        value={qty}
                        onChange={(e) => updateSku(sku, Number(e.target.value))}
                        style={styles.input}
                    />
                </div>
            ))}

            <AddSkuForm onAdd={updateSku} />
            <CartLoader cart={cart} setCart={onChange} />
        </div>
    );
}

const styles = {
    box: {
        background: "#1E1E1E",
        padding: 15,
        borderRadius: 4,
        minWidth: 200,
    },
    title: {
        color: "#80CBC4",
        marginBottom: 10,
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    input: {
        background: "#2A2A2A",
        border: "1px solid #333",
        color: "#E0E0E0",
        padding: 5,
        width: 60,
    }
};