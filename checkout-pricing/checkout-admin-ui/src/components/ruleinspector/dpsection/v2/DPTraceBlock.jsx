import {useState} from "react";
import {AnimatedBody} from "../../../../ui/AnimatedBody";
import {DPOverview} from "./DPOverview";
import {DPNodeTimeline} from "./timeline/DPNodeTimeline";
import {DPWinningPath} from "./DPWinningPath";

export function DPTraceBlock({ dp, isDark }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <div onClick={() => setOpen(!open)}
                 style={{
                     ...styles.header,
                     ...(isDark ? styles.headerDark : styles.headerLight)
                 }}>
                <span>SKU {dp.sku}</span>
                <span style={styles.toggle}>{open ? "▲" : "▼"}</span>
            </div>

            <AnimatedBody open={open}>
                <div style={styles.content}>
                    <DPOverview dp={dp} />

                    <div style={styles.scrollArea}>
                        <DPNodeTimeline dp={dp} />
                    </div>

                    <DPWinningPath dp={dp} />
                </div>
            </AnimatedBody>
        </div>
    )
}

const styles = {
    container: {
        border: "1px solid",
        borderRadius: 6,
        marginBottom: 10
    },
    containerDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee"
    },
    containerLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    header: {
        padding: "8px 12px",
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 600
    },
    headerDark: {
        color: "#BB86FC"
    },
    headerLight: {
        color: "#5A2DA8"
    },
    toggle: {
        opacity: 0.7
    },
    content: {
        padding: 12
    },
    scrollArea: {
        maxHeight: 300,
        overflowY: "auto",
        paddingRight: 6,
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8
    }
}