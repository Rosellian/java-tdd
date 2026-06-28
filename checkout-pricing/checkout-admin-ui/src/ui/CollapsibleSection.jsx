import { useState } from "react";
import {useTheme} from "./theme/ThemeProvider";
import {AnimatedBody} from "./AnimatedBody";

export function CollapsibleSection({ title, changed, children, defaultOpen = false }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [open, setOpen] = useState(defaultOpen);

    let changedBorderColor = changed ? "4px solid #FFB300" : "1px solid transparent";

    return (
        <div style={styles.container}>
            <div onClick={() => setOpen(!open)}
                style={{
                    ...styles.header,
                    ...(isDark ? styles.headerDark : styles.headerLight),
                    borderLeft: changedBorderColor
                }}
            >
                <span>{title}</span>

                <span style={styles.toggle}>{open ? "▼" : "▶"}</span>
            </div>

            <AnimatedBody open={open}>
                <div style={styles.body}>
                    {children}
                </div>
            </AnimatedBody>
        </div>
    )
}

const styles = {
    container: {
        marginBottom: 12,
        borderRadius: 4,
    },
    header: {
        maxWidth: 200,
        padding: "8px 10px",
        cursor: "pointer",
        fontWeight: 600,
        display: "flex",
        justifyContent: "space-between",
        transition: "background 0.25s ease"
    },
    headerDark: {
        background: "#2A2A2A",
        color: "#82B1FF",
        borderTop: "1px solid #333",
        borderRight: "1px solid #333",
        borderBottom: "1px solid #333"
    },
    headerLight: {
        background: "#eaeaea",
        color: "#5A2DA8",
        borderTop: "1px solid #ccc",
        borderRight: "1px solid #ccc",
        borderBottom: "1px solid #ccc"
    },
    toggle: {
        opacity: 0.8
    },
    body: {
        padding: 10
    }
}