import {runPricingEngine} from "../api/pricingEngine";

export function ButtonPanel({ cart, ruleSet, getTrace, setTrace }) {
    const isDisabled = Object.keys(cart).length === 0;

    async function evaluate() {
        const result = await runPricingEngine(cart, ruleSet);
        setTrace(result.trace);
    }

    return (
        <div style={styles.buttons}>
            <DisabledButton isDisabled={isDisabled} onClick={evaluate} name="Evaluate" />
            <DisabledButton isDisabled={isDisabled} onClick={() => getTrace(cart, ruleSet)} name="Get trace" />
        </div>
    );
}

function DisabledButton({ isDisabled, onClick, name }) {
    return (
        <button
            style={{
                ...styles.button,
                ...(isDisabled ? styles.buttonDisabled : {})
            }}
            disabled={isDisabled}
            onClick={onClick}>
            {name}
        </button>
    )
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
    },
    buttonDisabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        background: "#555",
    }
}