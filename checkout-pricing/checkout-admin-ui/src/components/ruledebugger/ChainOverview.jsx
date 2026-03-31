import {useTraceSync} from "../TraceSyncProvider";
import {ChainStep} from "./chainoverview/ChainStep";

export function ChainOverview({ steps }) {
    const { selectedStep, setSelectedStep } = useTraceSync();

    if (!steps) return null;

    return (
        <section style={styles.chainOverview}>
            <h3>Pricing Chain</h3>

            <ul style={styles.chainList}>
                {steps.map((s, i) => (
                    <ChainStep step={s} index={i} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
                ))}
            </ul>
        </section>
    );
}

const styles = {
    chainOverview: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },
    chainList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    }
};