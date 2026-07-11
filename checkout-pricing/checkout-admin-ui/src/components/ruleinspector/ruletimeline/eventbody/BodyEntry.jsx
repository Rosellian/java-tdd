import {BodyPart} from "./BodyPart";
import {AnimatedBody} from "../../../../ui/AnimatedBody";
import {useState} from "react";

export function BodyEntry({ label, value }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div style={styles.label} onClick={() => setOpen(!open)}>
                {label} {open ? "▲" : "▼"}
            </div>
            <AnimatedBody open={open}>
                <BodyPart label={label} value={value}/>
            </AnimatedBody>
        </div>
    )
}

const styles = {
    label: {
        fontWeight: 600,
        fontSize: "0.8rem",
        cursor: "pointer",
        userSelect: "none",
        padding: 5
    }
}