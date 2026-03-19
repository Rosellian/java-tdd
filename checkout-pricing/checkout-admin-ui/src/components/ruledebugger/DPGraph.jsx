export function DPGraph({ dp }) {
    if (!dp) {
        return (
            <div style={styles.dpEmpty}>
                No dynamic programming steps recorded.
            </div>
        );
    }

    return (
        <div style={styles.dpWrapper}>
            <h3 style={styles.dpHeader}>DP Graph</h3>

            <ul style={styles.dpList}>
                {dp.map((node, i) => (
                    <li key={i} style={styles.dpItem}>
                        <div style={styles.dpState}>State: {node.state}</div>
                        <div style={styles.dpValue}>Value: {node.value}</div>
                    </li>
                ))}
            </ul>

            <section className="dp-graph">
                <h3>DP States</h3>

                <ul>
                    {dp.map((state, i) => (
                        <li key={i} className="dp-state">
                            <div className="dp-label">{state.state}</div>
                            <div className="dp-options">
                                Options: {state.options.join(", ")}
                            </div>
                            <div className="dp-chosen">Chosen: {state.chosen}</div>
                            <div className="dp-price">Price: {state.price}</div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

const styles = {
    dpWrapper: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },
    dpHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#fff",
    },
    dpList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    dpItem: {
        padding: "10px 0",
        borderBottom: "1px solid #333",
    },
    dpState: {
        fontSize: "0.9rem",
        color: "#BB86FC",
    },
    dpValue: {
        fontSize: "0.85rem",
        color: "#4caf50",
        marginTop: 2,
    },
    dpEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    },
};