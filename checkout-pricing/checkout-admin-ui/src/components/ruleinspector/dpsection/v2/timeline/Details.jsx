import {Options} from "./Options";
import {highlightExplanationLine} from "../../../../../functions/dp/highlighting/highlighting";
import {CollapsibleBlock} from "./CollapsibleBlock";

export function Details({node, debuggerNode, remaining, beforePrice, isDark }) {
    return (
        <CollapsibleBlock title="Details">
            <div style={styles.details}>
                <span>Rule:</span>
                <span>{node.rule ?? "—"}</span>

                <span>Before:</span>
                <span>{beforePrice}</span>

                <span>After:</span>
                <span style={{
                    ...styles.afterPrice,
                    ...(isDark ? styles.afterPriceDark : styles.afterPriceLight)
                }}>
                    {debuggerNode.price}
                </span>

                <span>Remaining:</span>
                <span>{remaining}</span>

                <span>Chosen:</span>
                <span style={{
                    ...styles.chosen,
                    ...(isDark ? styles.chosenDark : styles.chosenLight)
                }}>
                    {highlightExplanationLine(debuggerNode.chosen)}
                </span>

                <Options options={debuggerNode.options} isDark={isDark} />
            </div>
        </CollapsibleBlock>
    )
}

const styles = {
    details: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gap: 6
    },
    chosen: {
        padding: "2px 6px",
        borderRadius: 4,
        fontWeight: 600
    },
    chosenDark: {
        background: "#2A2A2A",
        border: "1px solid #444",
        color: "#BB86FC"
    },
    chosenLight: {
        background: "#f5f0ff",
        border: "1px solid #d6c6ff",
        color: "#5A2DA8"
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