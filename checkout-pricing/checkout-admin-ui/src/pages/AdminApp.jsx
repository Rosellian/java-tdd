import {useState} from "react";
import { CartEditor } from "../components/carteditor/CartEditor";
import { RuleSetSelector } from "../components/RuleSetSelector";
import { RuleInspector } from "../components/ruleinspector/RuleInspector";
import { RuleDebugger } from "../components/ruledebugger/RuleDebugger";
import {usePricingTrace} from "../api/usePricingTrace";
import {TraceSyncProvider} from "../components/TraceSyncProvider";
import {ButtonPanel} from "../components/ButtonPanel";

export default function AdminApp() {
    const [cart, setCart] = useState({});
    const [ruleSet, setRuleSet] = useState("default");
    const [trace, setTrace] = useState(null);

    const { traceNew, loading, error, getTrace } = usePricingTrace(cart, ruleSet);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Pricing Engine Admin</h1>

            <div style={styles.controls}>
                <RuleSetSelector value={ruleSet} onChange={setRuleSet} />
                <CartEditor cart={cart} onChange={setCart} />
                <ButtonPanel cart={cart} ruleSet={ruleSet} getTrace={getTrace} setTrace={setTrace} />
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
    }
}