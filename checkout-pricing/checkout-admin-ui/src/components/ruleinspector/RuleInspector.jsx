import {RuleTimeline} from "./ruletimeline/RuleTimeline";
import {SkuBreakdown} from "./skubreakdown/SkuBreakdown";
import {DPSection} from "./dpsection/DPSection";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {TotalSection} from "./TotalSection";
import {DPSectionV2} from "./dpsection/v2/DPSectionV2";
import {inspectorStyles, renderEmptyState} from "./inspectorFuncs";

export function RuleInspector({ trace }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    if (!trace || !trace.inspectionTrace) {
        return renderEmptyState(isDark);
    }

    const inspectionTrace = trace.inspectionTrace;

    return (
        <div style={{
            ...inspectorStyles.container,
            ...(isDark ? inspectorStyles.dark : inspectorStyles.light)
        }}>
            <h1 style={{
                ...styles.header,
                ...(isDark ? styles.headerDark : styles.headerLight)
            }}>
                Rule Inspector
            </h1>

            <div style={styles.row}>
                <div style={styles.left}>
                    <RuleTimeline events={inspectionTrace.events} />
                </div>

                <div style={styles.right}>
                    <SkuBreakdown skuTraces={inspectionTrace.skuTraces} />

                    <DPSection dpTraces={inspectionTrace.dpTraces} />

                    <DPSectionV2 dpTraces={inspectionTrace.dpTraces} debuggerDPTraces={trace.debuggerTrace.dp} />

                    <TotalSection finalTotal={inspectionTrace.finalTotal} />
                </div>
            </div>
        </div>
    )
}

const styles = {
    header: {
        textAlign: "center",
        marginBottom: 30,
        transition: "color 0.3s ease"
    },
    headerDark: {
        color: "#BB86FC"
    },
    headerLight: {
        color: "#5A2DA8"
    },
    row: {
        display: "flex",
        gap: 20,
        alignItems: "flex-start"
    },
    left: {
        flex: "0.3 1 0"
    },
    right: {
        flex: "1 1 0",
        display: "flex",
        gap: 20
    }
}