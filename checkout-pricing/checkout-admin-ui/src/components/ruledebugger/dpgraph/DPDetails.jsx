export function DPDetails({ node, index }) {
    return (
        <div style={styles.dpDetails}>
            <h4 style={styles.dpDetailsHeader}>
                Step {index + 1}
            </h4>

            <DPDetail label={"State"} value={node.state} />
            <DPDetail label={"Chosen"} value={node.chosen} />
            <DPDetail label={"Price"} value={node.price} />
            <DPOptions node={node} />
        </div>
    );
}

function DPDetail({ label, value }) {
    return (
        <div style={styles.dpDetailsRow}>
            <span style={styles.dpLabel}>{label}:</span>
            <span style={styles.dpValue}>{value}</span>
        </div>
    )
}

function DPOptions({ node }) {
    return (
        <div style={styles.dpDetailsRow}>
            <span style={styles.dpLabel}>Options:</span>
            <span style={styles.dpValueList}>
                    {node.options && node.options.length > 0
                        ? node.options.join(", ")
                        : "None"}
            </span>
        </div>
    )
}

const styles = {
    dpDetails: {
        background: "#111",
        padding: 12,
        borderRadius: 6,
        border: "1px solid #333",
    },
    dpDetailsHeader: {
        marginBottom: 8,
        fontSize: "1rem",
        fontWeight: 600,
        color: "#BB86FC",
    },
    dpDetailsRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    dpLabel: {
        color: "#bbb",
    },
    dpValue: {
        color: "#4caf50",
        fontWeight: 600,
    },
    dpValueList: {
        color: "#ccc",
        fontStyle: "italic",
    }
}