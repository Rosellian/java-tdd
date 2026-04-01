import {Section} from "./Section";
import {RuleTimeline} from "./RuleTimeLine";
import {SkuBreakdown} from "./SkuBreakdown";
import {DPSection} from "./DPSection";

export function RuleInspector({ trace }) {
    if (!trace) {
        return (
            <div style={styles.container}>
                <p>No trace available. Run a pricing evaluation.</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Rule Inspector</h1>

            <RuleTimeline events={trace.events} />
            <SkuBreakdown skuTraces={trace.skuTraces} />
            <DPSection dpTraces={trace.dpTraces} />

            <Section title="Final Total">
                <div style={styles.total}>{trace.finalTotal} kr</div>
            </Section>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "monospace",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
        background: "#121212",
        color: "#E0E0E0",
    },
    header: {
        textAlign: "center",
        marginBottom: 30,
        color: "#BB86FC",
    },
    total: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#03DAC6",
    }
}