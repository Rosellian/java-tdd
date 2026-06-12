import {useState} from "react";
import {useTraceSync} from "../../TraceSyncProvider";
import {useTheme} from "../../../ui/ThemeProvider";

export function DPNodes({ nodes }) {
    const { theme } = useTheme();
    const [hoverIndex, setHoverIndex] = useState(null);
    const { selectedStep, setSelectedStep } = useTraceSync();

    function DPNode(i, isHovered, isSelected, node) {
        return (
            <div
                key={i}
                style={{
                    ...styles.dpNode,
                    ...(theme === "dark" ? styles.nodeDark : styles.nodeLight),
                    ...(isHovered ?
                        theme === "dark" ? styles.nodeHoverDark : styles.nodeHoverLight
                        : {}),
                    ...(isSelected ?
                        theme === "dark" ? styles.nodeSelectedDark : styles.nodeSelectedLight
                        : {})
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
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.9rem",
        fontWeight: 500,
        border: "1px solid",
    },
    nodeDark: {
        background: "#2a2a2a",
        borderColor: "#444",
        color: "#ccc",
    },
    nodeLight: {
        background: "#f0f0f0",
        borderColor: "#ccc",
        color: "#333",
    },
    nodeHoverDark: {
        background: "#3a3a3a",
        borderColor: "#666",
        color: "#fff",
    },
    nodeHoverLight: {
        background: "#e4d7ff",
        borderColor: "#bba3ff",
        color: "#3A1F6B",
    },
    nodeSelectedDark: {
        background: "#BB86FC",
        borderColor: "#BB86FC",
        color: "#000",
        fontWeight: 600,
    },
    nodeSelectedLight: {
        background: "#D9C4FF",
        borderColor: "#B48CFF",
        color: "#3A1F6B",
        fontWeight: 600,
    }
}