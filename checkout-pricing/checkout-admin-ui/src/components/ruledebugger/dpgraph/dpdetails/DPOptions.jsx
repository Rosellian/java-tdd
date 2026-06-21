import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {detailsStyles} from "./detailsStyles";

export function DPOptions({ node }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={detailsStyles.dpDetailsRow}>
            <span style={{
                ...detailsStyles.dpLabel,
                ...(isDark ? detailsStyles.labelDark : detailsStyles.labelLight)
            }}>
                Options:
            </span>

            <span style={{
                ...styles.dpValueList,
                ...(isDark ? styles.listDark : styles.listLight)
            }}>
                {getOptions(node)}
            </span>
        </div>
    )
}

function getOptions(node) {
    let isNonEmpty = node.options && node.options.length > 0;

    return isNonEmpty ? node.options.join(",\n") : "None";
}

const styles = {
    dpValueList: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontStyle: "italic",
        transition: "color 0.25s ease"
    },
    listDark: {
        color: "#ccc"
    },
    listLight: {
        color: "#444"
    }
}