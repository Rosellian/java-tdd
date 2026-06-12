import {useState} from 'react'
import {useTraceSync} from "../../../TraceSyncProvider";
import {RuleBody} from "./rulebody/RuleBody";
import {RuleEntry} from "./ruleentry/RuleEntry";
import {AnimatedBody} from "../../../../ui/AnimatedBody";
import {useTheme} from "../../../../ui/ThemeProvider";

export function RuleItem({ rule }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const {selectedStep, setSelectedStep} = useTraceSync();
    const isActive = rule.stepIndex === selectedStep;

    return (
        <li style={{
            ...styles.timelineItem,
            ...(theme === "dark" ? styles.itemDark : styles.itemLight),
            ...(isActive ?
                theme === "dark" ? styles.activeDark : styles.activeLight
                : {})
        }}>
            <RuleEntry rule={rule} onClick={() => selectOnClick(open, setOpen, selectedStep, setSelectedStep)}
                       open={open} />

            <AnimatedBody open={open}>
                <RuleBody rule={rule} />
            </AnimatedBody>
        </li>
    );
}

function selectOnClick(open, setOpen, selectedStep, setSelectedStep) {
    setOpen(!open)
    setSelectedStep(selectedStep);
}

const baseBorderDark = "1px solid #333";
const baseBorderLight = "1px solid #ddd";
const styles = {
    timelineItem: {
        padding: "10px 10px",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    itemDark: {
        borderTop: baseBorderDark,
        borderRight: baseBorderDark,
        borderBottom: baseBorderDark,
        borderLeft: baseBorderDark,
        background: "#1a1a1a",
        color: "#eee",
    },
    itemLight: {
        borderTop: baseBorderLight,
        borderRight: baseBorderLight,
        borderBottom: baseBorderLight,
        borderLeft: baseBorderLight,
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