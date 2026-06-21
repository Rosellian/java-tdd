import {RuleTimeline} from "./ruletimeline/RuleTimeline";
import {SkuBreakdown} from "./skubreakdown/SkuBreakdown";
import {DPSection} from "./dpsection/DPSection";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {TotalSection} from "./TotalSection";
import {DPSectionV2} from "./dpsection/v2/DPSectionV2";

export function RuleInspector({ trace }) {
    const { theme } = useTheme();

    if (!trace || !trace.inspectionTrace) {
        return (
            <div style={{
                ...styles.container,
                ...(theme === "dark" ? styles.dark : styles.light)
            }}>
                <p>No trace available. Run a pricing evaluation.</p>
            </div>
        )
    }

    const inspectionTrace = trace.inspectionTrace;

    return (
        <div style={{
            ...styles.container,
            ...(theme === "dark" ? styles.dark : styles.light)
        }}>
            <h1 style={{
                ...styles.header,
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>Rule Inspector</h1>

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
    container: {
        fontFamily: "monospace",
        padding: 20,
        margin: "0 auto",
        transition: "background 0.3s ease, color 0.3s ease"
    },
    dark: {
        background: "#121212",
        color: "#E0E0E0"
    },
    light: {
        background: "#ffffff",
        color: "#000000"
    },
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