import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {Details} from "./Details";
import {ExplanationBlock} from "./ExplanationBlock";

export function DPNodeTimeline({ dp }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div style={styles.timeline}>
            {dp.nodes.map((node, nodeIndex) => {
                const remaining = dp.remaining - (nodeIndex + 1);
                const prevPrice = nodeIndex > 0 ? dp.nodes[nodeIndex - 1].price : null;
                const priceColor = getPriceColor(prevPrice, node.price, isDark);

                return (
                    <div key={nodeIndex} style={{
                        ...styles.node,
                        ...(isDark ? styles.nodeDark : styles.nodeLight)
                    }}>
                        <div style={styles.step}>
                            Step {node.stepIndex}
                        </div>

                        <div style={styles.price}>
                            <strong>Price: </strong>
                            <span style={{color: priceColor}}>
                                {node.price}
                            </span>
                        </div>

                        <ExplanationBlock node={node}>
                            <Details node={node} remaining={remaining} isDark={isDark}/>
                        </ExplanationBlock>
                    </div>
                )
            })}
        </div>
    )
}

function getPriceColor(prev, current, isDark) {
    //TODO Maybe compare with full unit price alternative
    if (prev == null) return isDark ? "#ccc" : "#333";

    if (current < prev) return isDark ? "#4caf50" : "#2e7d32";

    if (current > prev) return "#d32f2f";

    return "#f9a825";
}

const styles = {
    timeline: {
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    node: {
        padding: 10,
        borderRadius: 6,
        border: "1px solid"
    },
    nodeDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee"
    },
    nodeLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222"
    },
    step: {
        fontWeight: 600,
        marginBottom: 4
    },
    price: {
        marginBottom: 6
    },
    explanation: {
        marginTop: 4,
        paddingLeft: 20
    }
}