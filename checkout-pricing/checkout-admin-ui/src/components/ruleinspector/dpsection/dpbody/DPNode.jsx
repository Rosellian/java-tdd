import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {highlightExplanationLine} from "../highlighting/highlighting";

export function DPNode({ node }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div key={node.index} style={{
            ...styles.dpNode,
            ...(isDark ? styles.nodeDark : styles.nodeLight)
        }}>
            <strong>[{node.index}] → {node.price} kr</strong>

            <pre style={{
                ...styles.pre,
                ...(isDark ? styles.preDark : styles.preLight)
            }}>
                {node.explanation.map((line, i) => (
                    <div key={i}>
                        {highlightExplanationLine(line)}
                    </div>
                ))}
            </pre>
        </div>
    )
}

const styles = {
    dpNode: {
        marginBottom: 10,
        padding: 10,
        borderLeft: "3px solid",
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    nodeDark: {
        background: "#222",
        borderColor: "#555",
        color: "#eee"
    },
    nodeLight: {
        background: "#f5f5f5",
        borderColor: "#aaa",
        color: "#222"
    },
    pre: {
        marginTop: 6,
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333"
    },
    preLight: {
        background: "#ffffff",
        color: "#333",
        borderColor: "#ddd"
    }
}