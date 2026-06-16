import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {BodyPart} from "./BodyPart";
import {useState} from "react";
import {AnimatedBody} from "../../../../ui/AnimatedBody";

export function EventBody({ event }) {
    const { theme } = useTheme();

    const [openDelta, setOpenDelta] = useState(false);
    const [openBefore, setOpenBefore] = useState(false);
    const [openAfter, setOpenAfter] = useState(false);

    return (
        <div style={{
            ...styles.eventBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <div style={styles.ruleName}>
                {event.ruleName}
            </div>

            <div style={styles.scroll}>
                <BodyEntry label="Delta" value={event.delta} open={openDelta} setOpen={setOpenDelta} />
                <BodyEntry label="Before" value={event.before} open={openBefore} setOpen={setOpenBefore} />
                <BodyEntry label="After" value={event.after} open={openAfter} setOpen={setOpenAfter} />
            </div>
        </div>
    )
}

function BodyEntry({label, value, open, setOpen }) {
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
    ruleName: {
        fontWeight: 600,
        fontSize: "0.85rem",
        marginBottom: 4,
        padding: 5,
    },
    label: {
        fontWeight: 600,
        fontSize: "0.8rem",
        cursor: "pointer",
        userSelect: "none",
        padding: 5
    },
    scroll: {
        maxHeight: 300,
        overflowY: "auto",
        paddingRight: 6,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        gap: 6
    },
    eventBody: {
        display: "grid",
        gridTemplateColumns: "1fr",
        columnGap: 8,
        rowGap: 4,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee"
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222"
    }
}