import {DPNode} from "./DPNode";
import {useTheme} from "../../../../ui/ThemeProvider";
import {DPResult} from "./DPResult";

export function DPBody({ dp }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.dpBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            {dp.nodes.map((node) => (
                <DPNode key={node.stepIndex} node={node} />
            ))}

            <DPResult dp={dp} />
        </div>
    )
}

const styles = {
    dpBody: {
        padding: 10,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee",
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222",
    }
}