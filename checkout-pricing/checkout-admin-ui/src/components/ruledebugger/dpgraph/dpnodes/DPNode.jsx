import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function DPNode({ node, hoverIndex, setHoverIndex, selectedStep, setSelectedStep }) {
    const { theme } = useTheme();

    const i = node.globalIndex;
    const isHovered = hoverIndex === i;
    const isSelected = selectedStep === i;

    return (
        <div
            key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setSelectedStep(i)}
            style={{
                ...styles.dpNode,
                ...(theme === "dark" ? styles.nodeDark : styles.nodeLight),
                ...(isHovered ?
                    theme === "dark" ? styles.nodeHoverDark : styles.nodeHoverLight
                    : {}),
                ...(isSelected ?
                    theme === "dark" ? styles.nodeSelectedDark : styles.nodeSelectedLight
                    : {})
            }}>{node.state}</div>
    )
}

const styles = {
    dpNode: {
        height: 20,
        padding: 10,
        borderRadius: 6,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.9rem",
        fontWeight: 500,
        border: "1px solid"
    },
    nodeDark: {
        background: "#2a2a2a",
        borderColor: "#444",
        color: "#ccc"
    },
    nodeLight: {
        background: "#f0f0f0",
        borderColor: "#ccc",
        color: "#333"
    },
    nodeHoverDark: {
        background: "#3a3a3a",
        borderColor: "#666",
        color: "#fff"
    },
    nodeHoverLight: {
        background: "#e4d7ff",
        borderColor: "#bba3ff",
        color: "#3A1F6B"
    },
    nodeSelectedDark: {
        background: "#BB86FC",
        borderColor: "#BB86FC",
        color: "#000",
        fontWeight: 600
    },
    nodeSelectedLight: {
        background: "#D9C4FF",
        borderColor: "#B48CFF",
        color: "#3A1F6B",
        fontWeight: 600
    }
}