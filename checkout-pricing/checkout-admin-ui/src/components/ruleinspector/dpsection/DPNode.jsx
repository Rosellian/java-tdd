export function DPNode({ node }) {
    return (
        <div key={node.index} style={styles.dpNode}>
            <strong>[{node.index}] → {node.price} kr</strong>
            <pre>{node.explanation.join("\n")}</pre>
        </div>
    )
}

const styles = {
    dpNode: {
        marginBottom: 10,
        padding: 10,
        background: "#222",
        borderLeft: "3px solid #555",
    }
}