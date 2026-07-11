import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function EventStatus({ event }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let appliedStyle = isDark ? styles.appliedDark : styles.appliedLight;
    let skippedStyle = isDark ? styles.skippedDark : styles.skippedLight;

    return (
        <span style={{
            ...styles.status,
            ...(event.applied ? appliedStyle : skippedStyle)
        }}>
            {event.applied ? "✔ Applied" : "✖ Skipped"}
        </span>
    )
}

const styles = {
    status: {
        fontWeight: 500,
        transition: "color 0.25s ease"
    },
    appliedDark: {
        color: "#7CFC7C"
    },
    appliedLight: {
        color: "#2e7d32"
    },
    skippedDark: {
        color: "#FF6B6B"
    },
    skippedLight: {
        color: "#d32f2f"
    }
}