import {RuleTimeline} from "./ruletimeline/RuleTimeLine";
import {SkuBreakdown} from "./skubreakdown/SkuBreakdown";
import {DPSection} from "./dpsection/DPSection";
import {useTheme} from "../../ui/ThemeProvider";
import {TotalSection} from "./TotalSection";

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
        );
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

            <RuleTimeline events={inspectionTrace.events} />
            <SkuBreakdown skuTraces={inspectionTrace.skuTraces} />
            <DPSection dpTraces={inspectionTrace.dpTraces} />
            <TotalSection finalTotal={inspectionTrace.finalTotal} />
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "monospace",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
        transition: "background 0.3s ease, color 0.3s ease",
    },
    dark: {
        background: "#121212",
        color: "#E0E0E0",
    },
    light: {
        background: "#ffffff",
        color: "#000000",
    },
    header: {
        textAlign: "center",
        marginBottom: 30,
        transition: "color 0.3s ease",
    },
    headerDark: {
        color: "#BB86FC",
    },
    headerLight: {
        color: "#5A2DA8",
    }
}