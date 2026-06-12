import {useState} from 'react'
import {useTraceSync} from "../../TraceSyncProvider";
import {RuleBody} from "./RuleBody";
import {RuleEntry} from "./RuleEntry";
import {AnimatedBody} from "../../../ui/AnimatedBody";
import {useTheme} from "../../../ui/ThemeProvider";

export function RuleItem({ rule }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const {selectedStep, setSelectedStep} = useTraceSync();
    const isActive = rule.stepIndex === selectedStep;

    function selectOnClick() {
        setOpen(!open)
        setSelectedStep(selectedStep);
    }

    return (
        <li style={{
            ...styles.timelineItem,
            ...(theme === "dark" ? styles.itemDark : styles.itemLight),
            ...(isActive ?
                theme === "dark" ? styles.activeDark : styles.activeLight
                : {})
        }}>
            <RuleEntry rule={rule} onClick={selectOnClick} open={open} />

            <AnimatedBody open={open}>
                <RuleBody rule={rule} />
            </AnimatedBody>
        </li>
    );
}

const styles = {
    timelineItem: {
        padding: "10px 0",
        borderBottom: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    itemDark: {
        borderColor: "#333",
        background: "#1a1a1a",
        color: "#eee",
    },
    itemLight: {
        borderColor: "#ddd",
        background: "#fafafa",
        color: "#222",
    },
    activeDark: {
        background: "#222",
        borderLeft: "3px solid #BB86FC",
    },
    activeLight: {
        background: "#e8e0ff",
        borderLeft: "3px solid #5A2DA8",
    }
}