import {Options} from "./Options";
import {highlightExplanationLine} from "../../../../../functions/dp/highlighting/highlighting";
import {CollapsibleBlock} from "./CollapsibleBlock";
import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function Details({node, debuggerNode, remaining, beforePrice }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const rules = node.rules ?? [];

    return (
        <CollapsibleBlock title="Details">
            <div style={styles.details}>
                <div style={styles.rules}>
                    <strong>Rules affecting DP:</strong>

                    {rules.map(rule => rule.name).join(", ")}
                </div>

                <div>
                    <span>Before: </span>

                    <span>{beforePrice}</span>
                </div>

                <div>
                    <span>After: </span>

                    <span style={{
                        ...styles.afterPrice,
                        ...(isDark ? styles.afterPriceDark : styles.afterPriceLight)
                    }}>
                        {debuggerNode.price}
                    </span>
                </div>

                <div>
                    <span>Remaining: </span>

                    <span>{remaining}</span>
                </div>

                <Chosen debuggerNode={debuggerNode} />

                <Options options={debuggerNode.options} />
            </div>
        </CollapsibleBlock>
    )
}

function Chosen({ debuggerNode }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    let chosenLines = debuggerNode.chosen.split("+");
    let length = chosenLines.length;
    let chosen = chosenLines.map((line, i) => (
        <div key={i}>
            {highlightExplanationLine(line)}
            {i < length-1 ? " +" : ""}
        </div>
    ));

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

const styles = {
    details: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 6
    },
    rules: {
        display: "flex",
        flexDirection: "column"
    },
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
    },
    afterPrice: {
        fontWeight: 600
    },
    afterPriceDark: {
        color: "#4caf50"
    },
    afterPriceLight: {
        color: "#2e7d32"
    }
}