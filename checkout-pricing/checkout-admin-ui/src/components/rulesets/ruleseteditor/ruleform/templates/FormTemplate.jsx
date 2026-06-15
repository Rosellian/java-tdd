import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function FormTemplate({ title, children }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.box,
            ...(theme === "dark" ? styles.boxDark : styles.boxLight)
        }}>
            <h3 style={styles.title}>{title}</h3>

            <div style={styles.grid}>
                {children}
            </div>
        </div>
    )
}

const styles = {
    box: {
        padding: 12,
        borderRadius: 6,
        transition: "background 0.3s ease, color 0.3s ease"
    },
    boxDark: {
        background: "#2A2A2A",
        color: "#E0E0E0"
    },
    boxLight: {
        background: "#FFFFFF",
        color: "#000000"
    },
    title: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: "bold",
        color: "#BB86FC"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
    }
}