import {useState} from "react";
import {Section} from "../../ui/Section";
import {DPHeader} from "./dpsection/DPHeader";
import {DPBody} from "./dpsection/DPBody";
import {AnimatedBody} from "../../ui/AnimatedBody";
import {useTheme} from "../../ui/ThemeProvider";

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
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            ...styles.dp,
            ...(theme === "dark" ? styles.dpDark : styles.dpLight)
        }}>
            <DPHeader dp={dp} onClick={() => setOpen(!open)} />

            <AnimatedBody open={open}>
                <DPBody dp={dp} />
            </AnimatedBody>
        </div>
    );
}

const styles = {
    dp: {
        marginBottom: 10,
        borderRadius: 4,
        border: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    dpDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#eee",
    },
    dpLight: {
        background: "#fafafa",
        borderColor: "#ccc",
        color: "#222",
    }
}