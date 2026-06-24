import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {Explanation} from "./Explanation";

export function DPNode({ node }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div key={node.index} style={{
            ...styles.dpNode,
            ...(isDark ? styles.nodeDark : styles.nodeLight)
        }}>
            <strong>[{node.index}] → {node.price} kr</strong>

            <Explanation node={node} />
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
    }
}