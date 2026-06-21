import {useState} from "react";
import {AnimatedBody} from "../../../../../ui/AnimatedBody";

export function CollapsibleBlock({ children, title, itemCount }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.header} onClick={() => setOpen(!open)}>
                <span style={styles.arrow}>{open ? "▼" : "▶"}</span>

                <span style={styles.title}>{title}</span>

                {itemCount && <span style={styles.count}>({itemCount})</span>}
            </div>

            <AnimatedBody open={open}>
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
    }
}