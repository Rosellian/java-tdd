import {useState} from "react";
import {useTraceSync} from "../TraceSyncProvider";
import {Section} from "../../ui/Section";
import {EventBody} from "./ruletimeline/EventBody";
import {EventHeader} from "./ruletimeline/EventHeader";
import {AnimatedBody} from "../../ui/AnimatedBody";
import {useTheme} from "../../ui/ThemeProvider";

export function RuleTimeline({ events }) {
    return (
        <Section title="Rule Execution">
            <div>
                {events.map((e, i) => (
                    <RuleEvent key={i} event={e} index={i} />
                ))}
            </div>
        </Section>
    );
}

function RuleEvent({ event, index }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const { selectedStep, setSelectedStep } = useTraceSync();
    const isActive = event.stepIndex === selectedStep;

    function openAndSelect() {
        setOpen(!open);
        setSelectedStep(event.stepIndex);
    }

    return (
        <div style={{
            ...styles.event,
            ...(theme === "dark" ? styles.eventDark : styles.eventLight),
            ...(isActive ?
                theme === "dark" ? styles.eventActiveDark : styles.eventActiveLight
                : {})
        }}>
            <EventHeader event={event} index={index} onClick={openAndSelect} />

            <AnimatedBody open={open}>
                <EventBody event={event}/>
            </AnimatedBody>
        </div>
    );
}

const styles = {
    event: {
        marginBottom: 10,
        borderRadius: 4,
        border: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    eventDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#eee",
    },
    eventLight: {
        background: "#fafafa",
        borderColor: "#ccc",
        color: "#222",
    },
    eventActiveDark: {
        background: "#2A2A2A",
        borderLeft: "3px solid #BB86FC",
    },
    eventActiveLight: {
        background: "#e8e0ff",
        borderLeft: "3px solid #5A2DA8",
    }
}