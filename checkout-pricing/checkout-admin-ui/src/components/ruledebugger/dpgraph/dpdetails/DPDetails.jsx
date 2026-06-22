import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {DPDetail} from "./DPDetail";
import {DPOptions} from "./DPOptions";
import {formatChosen} from "../../../../functions/dp/formatting";

export function DPDetails({ node, index }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.dpDetails,
            ...(isDark ? styles.detailsDark : styles.detailsLight)
        }}>
            <h4 style={{
                ...styles.dpDetailsHeader,
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}>
                Step {index + 1}
            </h4>

            <DPDetail label={"State"} value={node.state} />
            <DPDetail label={"Chosen"} value={formatChosen(node.chosen)} preFormatted={true} />
            <DPDetail label={"Price"} value={node.price} />

            <DPOptions node={node} />
        </div>
    )
}

const styles = {
    dpDetails: {
        width: "100%",
        minWidth: 260,
        padding: 12,
        borderRadius: 6,
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease"
    },
    detailsDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee"
    },
    detailsLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    dpDetailsHeader: {
        marginBottom: 8,
        fontSize: "1rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    headerDark: {
        color: "#BB86FC"
    },
    headerLight: {
        color: "#5A2DA8"
    }
}