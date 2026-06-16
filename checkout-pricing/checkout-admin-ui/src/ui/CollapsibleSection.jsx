import { useState } from "react";
import {useTheme} from "./theme/ThemeProvider";
import {AnimatedBody} from "./AnimatedBody";

export function CollapsibleSection({ title, changed, children, defaultOpen = false }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div style={styles.container}>
            <div onClick={() => setOpen(!open)}
                style={{
                    ...styles.header,
                    ...(theme === "dark" ? styles.headerDark : styles.headerLight),
                    borderLeft: changed ? "4px solid #FFB300" : "4px solid transparent"
                }}
            >
                <span>{title}</span>
                <span style={{ opacity: 0.8 }}>{open ? "▼" : "▶"}</span>
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
        borderRadius: 4
    },
    header: {
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
        borderColor: "#333"
    },
    headerLight: {
        background: "#eaeaea",
        color: "#5A2DA8",
        borderColor: "#ccc"
    },
    body: {
        padding: 10
    }
}