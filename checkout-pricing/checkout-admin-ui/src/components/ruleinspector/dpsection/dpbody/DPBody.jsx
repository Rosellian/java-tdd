import {DPNode} from "./node/DPNode";
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {DPResult} from "./result/DPResult";

export function DPBody({ dp }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.dpBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <div style={styles.nodeScroll}>
                {dp.nodes.map((node) => (
                    <DPNode key={node.stepIndex} node={node} />
                ))}
            </div>

            <DPResult dp={dp} />
        </div>
    )
}

const styles = {
    dpBody: {
        padding: 10,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee"
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222"
    },
    nodeScroll: {
        maxHeight: 250,
        overflowY: "auto",
        paddingRight: 6,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        gap: 6
    }
}