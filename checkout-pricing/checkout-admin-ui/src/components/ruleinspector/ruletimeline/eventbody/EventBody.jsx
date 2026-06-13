import {useTheme} from "../../../../ui/ThemeProvider";
import {BodyPart} from "./BodyPart";

export function EventBody({ event }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.eventBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <BodyPart label="Delta" value={event.delta} />
            <BodyPart label="Before" value={event.before} />
            <BodyPart label="After" value={event.after} />
        </div>
    )
}

const styles = {
    eventBody: {
        padding: 10,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee",
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222",
    }
}