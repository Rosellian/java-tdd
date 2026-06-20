import { useState } from "react";
import {AnimatedBody} from "../../../../../ui/AnimatedBody";
import {highlightExplanationLine} from "../../highlighting/highlighting";

export function ExplanationBlock({ node, children }) {
    const [open, setOpen] = useState(false);

    // children fields = 5 (Details)
    const itemCount = node.explanation.length + 5 + (node.options ? node.options.length : 0);

    return (
        <div style={styles.container}>
            <div style={styles.header} onClick={() => setOpen(!open)}>
                <span style={styles.arrow}>{open ? "▼" : "▶"}</span>
                <span style={styles.title}>Explanation</span>
                <span style={styles.count}>({itemCount})</span>
            </div>

            <AnimatedBody open={open}>
                <div style={styles.body}>
                    {node.explanation.map((line, i) => (
                        <div key={i} style={styles.line}>
                            {highlightExplanationLine(line)}
                        </div>
                    ))}
                </div>

                {children}
            </AnimatedBody>
        </div>
    )
}

const styles = {
    container: {
        marginTop: 8,
        borderLeft: "2px solid var(--border-color)",
        paddingLeft: 8
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        userSelect: "none",
        fontWeight: 600,
        color: "var(--text-secondary)"
    },
    arrow: {
        opacity: 0.7
    },
    title: {
        fontSize: 14
    },
    count: {
        fontSize: 12,
        opacity: 0.6
    },
    body: {
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2
    },
    line: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        whiteSpace: "pre-wrap"
    }
}