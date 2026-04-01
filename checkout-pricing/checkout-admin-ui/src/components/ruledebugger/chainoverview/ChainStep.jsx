import {ChainContent} from "./ChainContent";

export function ChainStep({ step, index, selectedStep, setSelectedStep }) {
    const isActive = selectedStep === index;

    return (
        <li key={index} style={{
            ...styles.chainItem,
            ...(isActive ? styles.chainActive : {})
        }} onClick={() => setSelectedStep(index)}>
            <div style={styles.chainIndex}>{index + 1}</div>

            <ChainContent step={step}/>
        </li>
    );
}

const styles = {
    chainItem: {
        display: "flex",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #333",
    },
    chainActive: {
        background: "#222",
        borderLeft: "3px solid #4caf50",
    },
    chainIndex: {
        width: 28,
        height: 28,
        background: "#333",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#aaa",
    }
}