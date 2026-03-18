import {useState} from "react";

export function DPSection({ dpTraces }) {
    return (
        <div>
            {dpTraces.map((dp, i) => (
                <DPTraceView key={i} dp={dp} />
            ))}
        </div>
    );
}

function DPTraceView({ dp }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.dp}>
            <div style={styles.dpHeader} onClick={() => setOpen(!open)}>
                <strong>SKU {dp.sku}</strong>
                <span>Remaining: {dp.remaining}</span>
            </div>

            {open && (
                <div style={styles.dpBody}>
                    {dp.nodes.map((node) => (
                        <div key={node.index} style={styles.dpNode}>
                            <strong>[{node.index}] → {node.price} kr</strong>
                            <pre>{node.explanation.join("\n")}</pre>
                        </div>
                    ))}

                    <h4>Winning Path</h4>
                    <pre>{dp.winningPath.join("\n")}</pre>

                    <h4>Total</h4>
                    <div>{dp.finalPrice} kr</div>
                </div>
            )}
        </div>
    );
}

const styles = {
    dp: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
    },
    dpHeader: {
        padding: 10,
        background: "#2E3A59",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        color: "#82B1FF",
    },
    dpBody: {
        padding: 10,
        background: "#1A1A1A",
    },
    dpNode: {
        marginBottom: 10,
        padding: 10,
        background: "#222",
        borderLeft: "3px solid #555",
    },
}