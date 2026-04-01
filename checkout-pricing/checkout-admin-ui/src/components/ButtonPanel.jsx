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
        marginBottom: 40,
    },
    button: {
        display: "block",
        width: "100%",
        background: "#BB86FC",
        border: "none",
        padding: "14px 20px",
        borderRadius: 6,
        cursor: "pointer",
        color: "#000",
        fontWeight: "bold",
        fontSize: "1rem",
        marginBottom: 12,
        transition: "background 0.2s",
    }
}