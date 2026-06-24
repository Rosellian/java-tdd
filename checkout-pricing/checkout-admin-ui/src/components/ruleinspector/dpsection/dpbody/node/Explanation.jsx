import {highlightExplanationLine} from "../../../../../functions/dp/highlighting/highlighting";
import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function Explanation({ node }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <pre style={{
            ...styles.pre,
            ...(isDark ? styles.preDark : styles.preLight)
        }}>
            {node.explanation.map((line, i) => (
                <div key={i}>
                    {highlightExplanationLine(line)}
                </div>
            ))}
        </pre>
    )
}

const styles = {
    pre: {
        marginTop: 6,
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    preDark: {
        background: "#2A2A2A",
        color: "#ccc",
        borderColor: "#333"
    },
    preLight: {
        background: "#ffffff",
        color: "#333",
        borderColor: "#ddd"
    }
}