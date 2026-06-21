import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {highlightExplanationLine} from "../../../../functions/dp/highlighting/highlighting";

export function DPWinningPath({ dp }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <h4 style={{
                ...styles.title,
                ...(isDark ? styles.titleDark : styles.titleLight)
            }}>
                Winning Path
            </h4>

            <div style={styles.path}>
                {dp.winningPath.map((line, i) => (
                    <div key={i}>
                        {highlightExplanationLine(line)}
                        {i < dp.winningPath.length-1 ? " +" : ""}
                    </div>
                ))}
            </div>

            <div style={styles.reason}>
                <strong>Reason: SAMPLE DATA</strong>

                <ul>
                    <li>Lowest final price</li>
                    <li>Valid remaining count</li>
                    <li>Rule priority respected</li>
                </ul>
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: 12,
        borderRadius: 6,
        border: "1px solid"
    },
    containerDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee"
    },
    containerLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    title: {
        marginTop: 0
    },
    titleDark: {
        color: "#BB86FC"
    },
    titleLight: {
        color: "#5A2DA8"
    },
    path: {
        fontSize: "0.9rem",
        fontWeight: 600
    },
    steps: {
        fontSize: "0.9rem",
        marginBottom: 8
    },
    step: {
        fontWeight: 600
    },
    reason: {
        opacity: 0.8
    }
}