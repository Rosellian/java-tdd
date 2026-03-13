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