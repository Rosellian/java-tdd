import {useState} from "react";
import {Section} from "../../ui/Section";
import {DPHeader} from "./dpsection/DPHeader";
import {DPBody} from "./dpsection/DPBody";
import {AnimatedBody} from "../../ui/AnimatedBody";

export function DPSection({ dpTraces }) {
    return (
        <Section title="Dynamic Programming Paths">
            <div>
                {dpTraces.map((dp, i) => (
                    <DPTraceView key={i} dp={dp} />
                ))}
            </div>
        </Section>
    );
}

function DPTraceView({ dp }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.dp}>
            <DPHeader dp={dp} onClick={() => setOpen(!open)} />

            <AnimatedBody open={open}>
                <DPBody dp={dp} />
            </AnimatedBody>
        </div>
    );
}

const styles = {
    dp: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
    }
}