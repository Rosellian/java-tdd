import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {BodyPart} from "./BodyPart";

export function EventBody({ event }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.eventBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <div style={styles.ruleName}>
                {event.ruleName}
            </div>

            <BodyPart label="Delta" value={event.delta} />
            <BodyPart label="Before" value={event.before} />
            <BodyPart label="After" value={event.after} />
        </div>
    )
}

const styles = {
    ruleName: {
        fontWeight: 600,
        fontSize: "0.85rem",
        opacity: 0.9,
        marginBottom: 4,
        padding: 5,
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