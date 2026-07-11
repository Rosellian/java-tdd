import {EventBody} from "./eventbody/EventBody";
import {EventHeader} from "./eventheader/EventHeader";
import {AnimatedBody} from "../../../ui/AnimatedBody";
import {useTraceSync} from "../../TraceSyncProvider";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {useState} from "react";

export function RuleEvent({ event, index }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let activeStyle = isDark ? styles.eventActiveDark : styles.eventActiveLight;

    const [open, setOpen] = useState(false);
    const { selectedStep, setSelectedStep } = useTraceSync();
    const isActive = event.stepIndex === selectedStep;

    let isActiveStyle = isActive ? activeStyle : {};

    return (
        <div style={{
            ...styles.event,
            ...(isDark ? styles.eventDark : styles.eventLight),
            ...isActiveStyle
        }}>
            <EventHeader event={event} index={index}
                         onClick={() => openAndSelect(event, open, setOpen, setSelectedStep)} />

            <AnimatedBody open={open}>
                <EventBody event={event}/>
            </AnimatedBody>
        </div>
    )
}

function openAndSelect(event, open, setOpen, setSelectedStep) {
    setOpen(!open);
    setSelectedStep(event.stepIndex);
}

const baseBorderDark = "1px solid #333";
const baseBorderLight = "1px solid #ccc";
const styles = {
    event: {
        marginBottom: 10,
        borderRadius: 4,
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    eventDark: {
        background: "#1E1E1E",
        borderTop: baseBorderDark,
        borderRight: baseBorderDark,
        borderBottom: baseBorderDark,
        borderLeft: baseBorderDark,
        color: "#eee"
    },
    eventLight: {
        background: "#fafafa",
        borderTop: baseBorderLight,
        borderRight: baseBorderLight,
        borderBottom: baseBorderLight,
        borderLeft: baseBorderLight,
        color: "#222"
    },
    eventActiveDark: {
        background: "#2A2A2A",
        borderLeft: "3px solid #BB86FC"
    },
    eventActiveLight: {
        background: "#e8e0ff",
        borderLeft: "3px solid #5A2DA8"
    }
}