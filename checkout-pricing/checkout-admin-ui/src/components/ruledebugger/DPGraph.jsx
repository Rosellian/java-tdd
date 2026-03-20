import {useState} from "react";
import {useTraceSync} from "./TraceSyncProvider";

export function DPGraph({ dp }) {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { selectedStep, setSelectedStep } = useTraceSync();

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

            <div style={styles.dpNodes}>
                {dp.map((node, i) => {
                    const isHovered = hoverIndex === i;
                    const isSelected = selectedStep === i;

                    return (
                        <div
                            key={i}
                            style={{
                                ...styles.dpNode,
                                ...(isHovered ? styles.dpNodeHover : {}),
                                ...(isSelected ? styles.dpNodeSelected : {}),
                            }}
                            onMouseEnter={() => setHoverIndex(i)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => setSelectedStep(i)}
                        >
                            {node.state}
                        </div>
                    );
                })}
            </div>

            {selectedStep !== null && (
                <DPDetails node={dp[selectedStep]} index={selectedStep} />
            )}
        </div>
    );
}

function DPDetails({ node, index }) {
    return (
        <div style={styles.dpDetails}>
            <h4 style={styles.dpDetailsHeader}>
                Step {index + 1}
            </h4>

            <div style={styles.dpDetailsRow}>
                <span style={styles.dpLabel}>State:</span>
                <span style={styles.dpValue}>{node.state}</span>
            </div>

            <div style={styles.dpDetailsRow}>
                <span style={styles.dpLabel}>Chosen:</span>
                <span style={styles.dpValue}>{node.chosen}</span>
            </div>

            <div style={styles.dpDetailsRow}>
                <span style={styles.dpLabel}>Price:</span>
                <span style={styles.dpValue}>{node.price}</span>
            </div>

            <div style={styles.dpDetailsRow}>
                <span style={styles.dpLabel}>Options:</span>
                <span style={styles.dpValueList}>
                    {node.options && node.options.length > 0
                        ? node.options.join(", ")
                        : "None"}
                </span>
            </div>
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
    dpNodes: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 16,
    },
    dpNode: {
        padding: "10px 14px",
        borderRadius: 6,
        background: "#333",
        cursor: "pointer",
        transition: "all 0.15s ease",
        color: "#ccc",
        border: "1px solid #444",
    },
    dpNodeHover: {
        background: "#444",
        borderColor: "#666",
        color: "#fff",
    },
    dpNodeSelected: {
        background: "#BB86FC",
        borderColor: "#BB86FC",
        color: "#000",
        fontWeight: 600,
    },
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
    },
    dpEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    },
};