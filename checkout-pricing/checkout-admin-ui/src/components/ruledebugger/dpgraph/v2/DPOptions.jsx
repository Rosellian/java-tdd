import {highlightExplanationLine} from "../../../../functions/dp/highlighting/highlighting";
import {detailsStyles} from "./detailsStyles";
import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function DPOptions({ node }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={detailsStyles.row}>
            <span style={detailsStyles.label}>Options</span>

            <div style={styles.tagList}>
                {(node.options?.length > 0 ? node.options : ["None"]).map((opt, i) => (
                    <span key={i} style={{
                        ...styles.tag,
                        ...(isDark ? styles.tagDark : styles.tagLight)
                    }}>
                        {highlightExplanationLine(opt)}
                    </span>
                ))}
            </div>
        </div>
    )
}

const styles = {
    tagList: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
    },
    tag: {
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: "0.75rem",
        border: "1px solid"
    },
    tagDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#ccc"
    },
    tagLight: {
        background: "#f5f5f5",
        borderColor: "#ccc",
        color: "#333"
    }
}