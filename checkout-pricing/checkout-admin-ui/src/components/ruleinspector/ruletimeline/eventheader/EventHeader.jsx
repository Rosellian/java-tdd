import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {EventStatus} from "./EventStatus";

export function EventHeader({event, index, onClick}) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div onClick={onClick} style={{
            ...styles.eventHeader,
            ...(isDark ? styles.headerDark : styles.headerLight)
        }}>
            <strong style={{
                ...(isDark ? styles.titleDark : styles.titleLight)
            }}>
                {index + 1}. {event.name}
            </strong>

            <EventStatus event={event} />
        </div>
    )
}

const styles = {
    eventHeader: {
        padding: 10,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background 0.25s ease, color 0.25s ease",
        borderBottom: "1px solid"
    },
    headerDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#eee"
    },
    headerLight: {
        background: "#f0f0f0",
        borderColor: "#ccc",
        color: "#222"
    },
    titleDark: {
        color: "#BB86FC"
    },
    titleLight: {
        color: "#5A2DA8"
    }
}