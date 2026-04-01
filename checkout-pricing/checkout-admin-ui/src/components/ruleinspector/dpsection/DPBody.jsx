import {DPNode} from "./DPNode";

export function DPBody({ dp }) {
    return (
        <div style={styles.dpBody}>
            {dp.nodes.map((node) => (
                <DPNode node={node} />
            ))}

            <DPResult dp={dp} />
        </div>
    )
}

function DPResult({ dp }) {
    return (
        <div>
            <h4>Winning Path</h4>
            <pre>{dp.winningPath.join("\n")}</pre>

            <h4>Total</h4>
            <div>{dp.finalPrice} kr</div>
        </div>
    )
}

const styles = {
    dpBody: {
        padding: 10,
        background: "#1A1A1A",
    }
}