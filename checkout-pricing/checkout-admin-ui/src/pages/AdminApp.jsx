import {useState} from "react";
import { CartEditor } from "../components/carteditor/CartEditor";
import { RuleInspector } from "../components/ruleinspector/RuleInspector";
import { RuleDebugger } from "../components/ruledebugger/RuleDebugger";
import {usePricingTrace} from "../api/usePricingTrace";
import {TraceSyncProvider} from "../components/TraceSyncProvider";
import {ButtonPanel} from "../components/ButtonPanel";
import {useTheme} from "../ui/theme/ThemeProvider";
import {RulesetHandler} from "../components/rulesets/RulesetHandler";
import {PriceListHandler} from "../components/prices/PriceListHandler";
import {CustomerPanel} from "../components/customer/CustomerPanel";
import {examplePrivateCustomer} from "../components/customer/sample/samplePrivate";
import {CustomerPanelV2} from "../components/customer/v2/CustomerPanelV2";

export default function AdminApp() {
    const { theme } = useTheme();

    const [cart, setCart] = useState({});
    const [ruleset, setRuleset] = useState("default");
    const [priceList, setPriceList] = useState("default");

    const [customer, setCustomer] = useState(examplePrivateCustomer);
    const [originalCustomer] = useState(examplePrivateCustomer);

    const { trace, loading, error, getTrace } = usePricingTrace();

    return (
        <div style={{
            ...styles.container,
            ...(theme === "dark" ? styles.dark : styles.light)
        }}>
            <h1 style={styles.header}>Pricing Engine Admin</h1>

            <div style={styles.controls}>
                <div style={styles.row}>
                    <RulesetHandler onRulesetChange={setRuleset} />

                    <PriceListHandler onPriceListChange={setPriceList} />
                </div>

                <div style={styles.row}>
                    <CartEditor cart={cart} onChange={setCart} />

                    <CustomerPanel customer={customer} setCustomer={setCustomer} originalCustomer={originalCustomer} />
                    <CustomerPanelV2 customer={customer} setCustomer={setCustomer} originalCustomer={originalCustomer} />

                    <ButtonPanel cart={cart} ruleset={ruleset} priceList={priceList} customer={customer}
                                 getTrace={getTrace} />
                </div>
            </div>

            {loading && <p>Evaluating pricing…</p>}
            {error && <p style={{ color: "red" }}>Error loading trace: {error}</p>}

            <TraceSyncProvider>
                <RuleInspector trace={trace} />
                <RuleDebugger trace={trace} />
            </TraceSyncProvider>
        </div>
    )
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
        marginBottom: 10,
        color: "#BB86FC",
    },
    controls: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    row: {
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
    }
}