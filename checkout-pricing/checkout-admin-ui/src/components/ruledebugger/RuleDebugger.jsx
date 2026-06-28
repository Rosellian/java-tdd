import {ChainOverview} from "./chainoverview/ChainOverview";
import {RuleTimeline} from "./ruletimeline/RuleTimeline";
import {DPGraph} from "./dpgraph/DPGraph";
import {PriceEvolutionChart} from "./priceevolutionchart/PriceEvolutionChart";
import {TraceSyncProvider} from "../TraceSyncProvider";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {debuggerStyles, renderEmptyState} from "./debuggerFuncs";

export function RuleDebugger({ trace }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    if (!trace || !trace.debuggerTrace) {
        return renderEmptyState(isDark);
    }

    const debuggerTrace = trace.debuggerTrace;

    return (
        <div style={{
            ...debuggerStyles.container,
            ...(isDark ? debuggerStyles.dark : debuggerStyles.light)
        }}>
            <h2 style={{
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}>
                Rule Debugger
            </h2>

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