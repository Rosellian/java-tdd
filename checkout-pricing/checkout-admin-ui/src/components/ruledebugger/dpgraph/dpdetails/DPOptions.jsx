import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {detailsStyles} from "./detailsStyles";

export function DPOptions({ node }) {
    const { theme } = useTheme();

    return (
        <div style={detailsStyles.dpDetailsRow}>
            <span style={{
                ...detailsStyles.dpLabel,
                ...(theme === "dark" ? detailsStyles.labelDark : detailsStyles.labelLight)
            }}>Options:</span>
            <span style={{
                ...styles.dpValueList,
                ...(theme === "dark" ? styles.listDark : styles.listLight)
            }}>
                    {node.options && node.options.length > 0
                        ? node.options.join(", ")
                        : "None"}
            </span>
        </div>
    )
}

const styles = {
    dpValueList: {
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