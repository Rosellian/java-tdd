import {useTheme} from "../../../../../../../ui/theme/ThemeProvider";
import {highlightExplanationLine} from "../../../../../../../functions/dp/highlighting/highlighting";

export function Chosen({ debuggerNode }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    let chosen = createChosenData(debuggerNode);

    return (
        <div style={styles.chosenContainer}>
            <span>Chosen: </span>

            <div style={{
                ...styles.chosen,
                ...(isDark ? styles.chosenDark : styles.chosenLight)
            }}>
                {chosen}
            </div>
        </div>
    )
}

function createChosenData(debuggerNode) {
    let chosenLines = debuggerNode.chosen.split("+");
    let length = chosenLines.length;

    return chosenLines.map((line, i) => (
        <div key={i}>
            {highlightExplanationLine(line)}
            {i < length - 1 ? " +" : ""}
        </div>
    ));
}

const styles = {
    chosenContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    chosen: {
        padding: "2px 6px",
        width: "fit-content",
        borderRadius: 4,
        fontWeight: 600
    },
    chosenDark: {
        background: "#2A2A2A",
        border: "1px solid #444",
        color: "#eee"
    },
    chosenLight: {
        background: "#f5f0ff",
        border: "1px solid #d6c6ff",
        color: "#222"
    }
}