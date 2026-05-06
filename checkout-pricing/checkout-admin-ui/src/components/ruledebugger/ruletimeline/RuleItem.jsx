import {useState} from 'react'
import {useTraceSync} from "../../TraceSyncProvider";
import {RuleBody} from "./RuleBody";
import {RuleEntry} from "./RuleEntry";
import {AnimatedBody} from "../../../ui/AnimatedBody";

export function RuleItem({ rule }) {
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
            ...(isActive ? styles.ruleActive : {})
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
        borderBottom: "1px solid #333",
    },
    ruleActive: {
        background: "#222",
        borderLeft: "3px solid #BB86FC",
    }
}