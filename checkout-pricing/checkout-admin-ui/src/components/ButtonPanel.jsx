import {runPricingEngine} from "../api/pricingEngine";

export function ButtonPanel({ cart, ruleSet, getTrace, setTrace }) {

    async function evaluate() {
        const result = await runPricingEngine(cart, ruleSet);
        setTrace(result.trace);
    }

    return (
        <div style={styles.buttons}>
            <button style={styles.button} onClick={evaluate}>
                Evaluate
            </button>
            <button style={styles.button} onClick={() => getTrace(cart, ruleSet)}>
                Get trace
            </button>
        </div>
    );
}

const styles = {
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
}