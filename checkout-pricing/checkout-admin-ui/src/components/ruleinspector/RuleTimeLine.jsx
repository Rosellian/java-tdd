import {useState} from "react";
import {useTraceSync} from "../TraceSyncProvider";
import {Section} from "./Section";
import {EventBody} from "./ruletimeline/EventBody";
import {EventHeader} from "./ruletimeline/EventHeader";

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
            ...(isActive ? styles.eventActive : {})
        }}>
            <EventHeader event={event} index={index} onClick={openAndSelect} />

            {open && <EventBody event={event}/>}
        </div>
    );
}

const styles = {
    event: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
    },
    eventActive: {
        background: "#2A2A2A",
        borderLeft: "3px solid #BB86FC",
    }
}