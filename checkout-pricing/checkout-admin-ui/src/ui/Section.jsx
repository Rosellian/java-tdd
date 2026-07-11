import {useTheme} from "./theme/ThemeProvider";

export function Section({ title, children }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={styles.section}>
            <h2 style={{
                ...styles.sectionHeader,
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}>
                {title}
            </h2>
            {children}
        </div>
    )
}

const styles = {
    section: {
        marginBottom: 40
    },
    sectionHeader: {
        borderBottom: "1px solid",
        paddingBottom: 5,
        marginBottom: 15,
        fontSize: "1.2rem",
        fontWeight: 600,
        transition: "color 0.25s ease, border-color 0.25s ease"
    },
    headerDark: {
        color: "#BB86FC",
        borderColor: "#333"
    },
    headerLight: {
        color: "#5A2DA8",
        borderColor: "#ccc"
    }
}