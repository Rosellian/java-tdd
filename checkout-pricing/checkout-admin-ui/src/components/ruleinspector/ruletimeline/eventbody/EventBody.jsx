import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {BodyEntry} from "./BodyEntry";

export function EventBody({ event }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.eventBody,
            ...(isDark ? styles.bodyDark : styles.bodyLight)
        }}>
            <div style={styles.ruleName}>
                {event.ruleName}
            </div>

            <div style={styles.scroll}>
                <BodyEntry label="Delta" value={event.delta} />

                <BodyEntry label="Before" value={event.before} />

                <BodyEntry label="After" value={event.after} />
            </div>
        </div>
    )
}

const styles = {
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
    },
    ruleName: {
        fontWeight: 600,
        fontSize: "0.85rem",
        marginBottom: 4,
        padding: 5,
    },
    scroll: {
        maxHeight: 300,
        overflowY: "auto",
        paddingRight: 6,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        gap: 6
    }
}