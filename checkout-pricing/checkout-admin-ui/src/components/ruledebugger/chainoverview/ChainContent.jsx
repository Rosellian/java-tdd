import {ChainPrice} from "./ChainPrice";

export function ChainContent({ step }) {
    return (
        <div style={styles.chainContent}>
            <div style={styles.chainStep}>{step.step}</div>
            <div style={styles.chainDesc}>{step.description}</div>
            <ChainPrice step={step}/>
        </div>
    );
}

const styles = {
    chainContent: {
        flex: 1,
    },
    chainStep: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#fff",
    },
    chainDesc: {
        fontSize: "0.85rem",
        color: "#bbb",
        marginTop: 2,
    }
};