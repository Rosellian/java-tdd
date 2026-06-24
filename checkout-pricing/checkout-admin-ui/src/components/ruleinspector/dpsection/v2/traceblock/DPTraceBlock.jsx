import {useState} from "react";
import {AnimatedBody} from "../../../../../ui/AnimatedBody";
import {DPOverview} from "./DPOverview";
import {DPNodeTimeline} from "./timeline/DPNodeTimeline";
import {DPWinningPath} from "./winningpath/DPWinningPath";
import {BlockHeader} from "./BlockHeader";
import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function DPTraceBlock({ dp, debuggerDP }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [open, setOpen] = useState(false);

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <BlockHeader dp={dp} open={open} setOpen={setOpen} />

            <AnimatedBody open={open}>
                <div style={styles.content}>
                    <DPOverview dp={dp}/>

                    <div style={styles.scrollArea}>
                        <DPNodeTimeline dp={dp} debuggerDP={debuggerDP}/>
                    </div>

                    <DPWinningPath dp={dp}/>
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