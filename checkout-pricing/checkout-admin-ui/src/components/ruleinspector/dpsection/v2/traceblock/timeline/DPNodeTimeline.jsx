import {useTheme} from "../../../../../../ui/theme/ThemeProvider";
import {Details} from "./details/Details";
import {ExplanationBlock} from "./ExplanationBlock";
import {Price} from "./Price";
import {getDetailsInput} from "./timelineFuncs";

export function DPNodeTimeline({ dp, debuggerDP }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div style={styles.timeline}>
            {dp.nodes.map((node, nodeIndex) => {
                const {debuggerNode, remaining, prevPrice} =
                    getDetailsInput(dp, nodeIndex, debuggerDP);

                return (
                    <div key={nodeIndex} style={{
                        ...styles.node,
                        ...(isDark ? styles.nodeDark : styles.nodeLight)
                    }}>
                        <div style={styles.step}>
                            Step {node.stepIndex}
                        </div>

                        <Price node={node} prevPrice={prevPrice} />

                        <ExplanationBlock node={node} />

                        <Details node={node} debuggerNode={debuggerNode}
                                 beforePrice={prevPrice} remaining={remaining} />
                    </div>
                )
            })}
        </div>
    )
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
    explanation: {
        marginTop: 4,
        paddingLeft: 20
    }
}