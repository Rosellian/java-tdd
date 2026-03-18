import React from "react";
import {ChainOverview} from "./ChainOverview";
import {RuleTimeline} from "./RuleTimeline";
import {DPGraph} from "./DPGraph";
import {PriceEvolutionChart} from "./PriceEvolutionChart";

export function RuleDebugger({ trace }) {
    if (!trace) {
        return (
            <div style={styles.ruleDebugger}>
                <p>No trace available. Run a pricing evaluation.</p>
            </div>
        );
    }

    return (
        <div style={styles.ruleDebugger}>
            <h2>Rule Debugger</h2>

            <div style={styles.debuggerGrid}>
                <ChainOverview steps={trace.steps} />
                <RuleTimeline rules={trace.rules} />
                <DPGraph dp={trace.dp} />
                <PriceEvolutionChart prices={trace.priceEvolution} />
            </div>
        </div>
    );
}

export const styles = {
    ruleDebugger: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },

    debuggerGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
    },

    section: {
        background: "#222",
        padding: 12,
        borderRadius: 6,
    },
}