import {useState} from "react";
import { CartEditor } from "../components/carteditor/CartEditor";
import { RuleInspector } from "../components/ruleinspector/RuleInspector";
import { RuleDebugger } from "../components/ruledebugger/RuleDebugger";
import {usePricingTrace} from "../api/usePricingTrace";
import {TraceSyncProvider} from "../components/TraceSyncProvider";
import {ButtonPanel} from "../components/ButtonPanel";
import {useTheme} from "../ui/ThemeProvider";
import {RulesetHandler} from "../components/rulesets/RulesetHandler";
import {PriceListHandler} from "../components/prices/PriceListHandler";

export default function AdminApp() {
    const { theme } = useTheme();
    const [cart, setCart] = useState({});
    const [ruleset, setRuleset] = useState("default");
    const [priceList, setPriceList] = useState("default");
    const [trace, setTrace] = useState(null);

    const { traceNew, loading, error, getTrace } = usePricingTrace(cart, ruleset);

    return (
        <div style={{
            ...styles.container,
            ...(theme === "dark" ? styles.dark : styles.light)
        }}>
            <h1 style={styles.header}>Pricing Engine Admin</h1>

            <div style={styles.controls}>
                <RulesetHandler onRulesetChange={setRuleset} />
                <PriceListHandler onPriceListChange={setPriceList} />
                <CartEditor cart={cart} onChange={setCart} />
                <ButtonPanel cart={cart} ruleset={ruleset} priceList={priceList} getTrace={getTrace} setTrace={setTrace} />
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
        minHeight: "100vh",
        padding: 20,
        fontFamily: "monospace",
    },
    dark: {
        background: "#121212",
        color: "#E0E0E0",
    },
    light: {
        background: "#ffffff",
        color: "#000000",
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