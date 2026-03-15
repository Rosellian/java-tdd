import React from "react";
import {ChainOverview} from "./ChainOverview";
import {RuleTimeline} from "./RuleTimeline";
import {DPGraph} from "./DPGraph";
import {PriceEvolutionChart} from "./PriceEvolutionChart";

export function RuleDebugger({ trace }) {
    if (!trace) {
        return (
            <div className="rule-debugger empty">
                <p>No trace available. Run a pricing evaluation.</p>
            </div>
        );
    }

    return (
        <div className="rule-debugger">
            <h2>Rule Debugger</h2>

            <div className="debugger-grid">
                <ChainOverview steps={trace.steps} />
                <RuleTimeline rules={trace.rules} />
                <DPGraph dp={trace.dp} />
                <PriceEvolutionChart prices={trace.priceEvolution} />
            </div>
        </div>
    );
}