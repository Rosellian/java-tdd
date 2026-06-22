import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {detailsStyles} from "./detailsStyles";
import {highlightExplanationLine} from "../../../../functions/dp/highlighting/highlighting";

export function DPOptions({ node }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let options = node.options?.length > 0 ? node.options : ["None"];

    return (
        <div style={detailsStyles.dpDetailsRow}>
            <span style={{
                ...detailsStyles.dpLabel,
                ...(isDark ? detailsStyles.labelDark : detailsStyles.labelLight)
            }}>
                Options:
            </span>

            <div style={styles.dpValueList}>
                {options.map((opt) => (
                    <span>
                        {highlightExplanationLine(opt)}
                    </span>
                ))}
            </div>
        </div>
    )
}

const styles = {
    dpValueList: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        transition: "color 0.25s ease"
    },
    listDark: {
        color: "#ccc"
    },
    listLight: {
        color: "#444"
    }
}