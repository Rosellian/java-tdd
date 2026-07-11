import {highlightExplanationLine} from "../../../../../../../functions/dp/highlighting/highlighting";
import {useTheme} from "../../../../../../../ui/theme/ThemeProvider";

export function Options({ options }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div style={styles.container}>
            <span>Options:</span>

            <div style={styles.options}>
                {(options?.length ? options : ["None"]).map((opt, j) => (
                    <span key={j} style={{
                        ...styles.option,
                        ...(isDark ? styles.optionDark : styles.optionLight)
                    }}>
                        {highlightExplanationLine(opt)}
                    </span>
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    options: {
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    option: {
        whiteSpace: "nowrap",
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: "0.75rem",
        border: "1px solid",
        width: "fit-content",
    },
    optionDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#ccc"
    },
    optionLight: {
        background: "#f5f5f5",
        borderColor: "#ccc",
        color: "#333"
    }
}