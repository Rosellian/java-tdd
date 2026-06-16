import {ChainOverview} from "./chainoverview/ChainOverview";
import {RuleTimeline} from "./ruletimeline/RuleTimeline";
import {DPGraph} from "./dpgraph/DPGraph";
import {PriceEvolutionChart} from "./priceevolutionchart/PriceEvolutionChart";
import {TraceSyncProvider} from "../TraceSyncProvider";
import {useTheme} from "../../ui/theme/ThemeProvider";

export function RuleDebugger({ trace }) {
    const { theme } = useTheme();

    if (!trace || !trace.debuggerTrace) {
        return (
            <div style={{
                ...styles.ruleDebugger,
                ...(theme === "dark" ? styles.dark : styles.light)
            }}>
                <p>No trace available. Run a pricing evaluation.</p>
            </div>
        )
    }

    const debuggerTrace = trace.debuggerTrace;

    return (
        <div style={{
            ...styles.container,
            ...(theme === "dark" ? styles.dark : styles.light)
        }}>
            <h2 style={{
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>Rule Debugger</h2>

            <div style={styles.ruleDebugger}>
                <TraceSyncProvider>
                    <div style={styles.leftCol}>
                        <ChainOverview steps={debuggerTrace.steps} />
                        <RuleTimeline rules={debuggerTrace.rules} />
                    </div>

                    <div style={styles.rightCol}>
                        <DPGraph dp={debuggerTrace.dp} />
                        <PriceEvolutionChart prices={debuggerTrace.priceEvolution} />
                    </div>
                </TraceSyncProvider>
            </div>
        </div>
    )
}

export const styles = {
    container: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.3s ease, color 0.3s ease"
    },
    dark: {
        background: "#1a1a1a",
        color: "#eee"
    },
    light: {
        background: "#f5f5f5",
        color: "#000"
    },
    headerDark: {
        color: "#BB86FC",
        marginBottom: 16
    },
    headerLight: {
        color: "#5A2DA8",
        marginBottom: 16
    },
    ruleDebugger: {
        display: "flex",
        alignItems: "flex-start",
        gap: 16
    },
    leftCol: {
        flex: 1,
        display: "flex",
        gap: 12
    },
    rightCol: {
        flex: 1,
        display: "flex",
        gap: 12
    }
}