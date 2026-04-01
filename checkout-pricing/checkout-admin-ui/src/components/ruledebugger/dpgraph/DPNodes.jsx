import {useState} from "react";
import {useTraceSync} from "../../TraceSyncProvider";

export function DPNodes({ nodes }) {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { selectedStep, setSelectedStep } = useTraceSync();

    function DPNode(i, isHovered, isSelected, node) {
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
    }

    return (
        <div style={styles.dpNodes}>
            {nodes.map((node) => {
                const i = node.globalIndex;
                const isHovered = hoverIndex === i;
                const isSelected = selectedStep === i;

                return DPNode(i, isHovered, isSelected, node);
            })}
        </div>
    );
}

const styles = {
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
    }
}