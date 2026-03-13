import React, { useState } from "react";
import { CartEditor } from "../components/CartEditor";
import { RuleSetSelector } from "../components/RuleSetSelector";
import { RuleInspector } from "../components/ruleinspector/RuleInspector";
import { runPricingEngine } from "../api/pricingEngine";

export default function AdminApp() {
    const [cart, setCart] = useState({});
    const [ruleSet, setRuleSet] = useState("default");
    const [trace, setTrace] = useState(null);

    async function evaluate() {
        const result = await runPricingEngine(cart, ruleSet);
        setTrace(result.trace);
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Pricing Engine Admin</h1>

            <div style={styles.controls}>
                <RuleSetSelector value={ruleSet} onChange={setRuleSet} />
                <CartEditor cart={cart} onChange={setCart} />
                <button style={styles.button} onClick={evaluate}>
                    Evaluate
                </button>
            </div>

            {trace && <RuleInspector trace={trace} />}
        </div>
    );
}

const styles = {
    container: {
        background: "#121212",
        minHeight: "100vh",
        color: "#E0E0E0",
        padding: 20,
        fontFamily: "monospace",
    },
    header: {
        textAlign: "center",
        marginBottom: 30,
        color: "#BB86FC",
    },
    controls: {
        display: "flex",
        gap: 20,
        marginBottom: 40,
    },
    button: {
        background: "#BB86FC",
        border: "none",
        padding: "10px 20px",
        borderRadius: 4,
        cursor: "pointer",
        color: "#000",
        fontWeight: "bold",
    },
};