import React, {useState} from "react";
import { CartEditor } from "../components/carteditor/CartEditor";
import { RuleSetSelector } from "../components/RuleSetSelector";
import { RuleInspector } from "../components/ruleinspector/RuleInspector";
import { RuleDebugger } from "../components/ruledebugger/RuleDebugger";
import {runPricingEngine} from "../api/pricingEngine";
import {usePricingTrace} from "../api/usePricingTrace";
import {TraceSyncProvider} from "../components/TraceSyncProvider";

export default function AdminApp() {
    const [cart, setCart] = useState({});
    const [ruleSet, setRuleSet] = useState("default");
    const [trace, setTrace] = useState(null);

    async function evaluate() {
        const result = await runPricingEngine(cart, ruleSet);
        setTrace(result.trace);
    }

    const { traceNew, loading, error, getTrace } = usePricingTrace(cart, ruleSet);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Pricing Engine Admin</h1>

            <div style={styles.controls}>
                <RuleSetSelector value={ruleSet} onChange={setRuleSet} />
                <CartEditor cart={cart} onChange={setCart} />
                <div style={styles.buttons}>
                    <button style={styles.button} onClick={evaluate}>
                        Evaluate
                    </button>
                    <button style={styles.button} onClick={() => getTrace(cart, ruleSet)}>
                        Get trace
                    </button>
                </div>
            </div>

            {loading && <p>Evaluating pricing…</p>}
            {error && <p style={{ color: "red" }}>Error loading trace: {error}</p>}

            <TraceSyncProvider>
                <RuleInspector trace={trace} />
                <RuleDebugger trace={traceNew} />
            </TraceSyncProvider>
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
    buttons: {
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
    }
};