import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function ChangesView({ diffs }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <div style={styles.header}>
                Changes:
            </div>
            {diffs.map((diff, i) => (
                <div key={i} style={styles.diff}>
                    • {diff}
                </div>
            ))}
        </div>
    )
}

const styles = {
    container: {
        marginTop: 10,
        padding: "8px 12px",
        borderRadius: 4,
        fontSize: 13
    },
    containerDark: {
        background: "#263238"
    },
    containerLight: {
        background: "#ECEFF1"
    },
    header: {
        fontWeight: 600,
        marginBottom: 4
    },
    diff: {
        marginLeft: 8
    }
}