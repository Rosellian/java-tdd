import React from "react";
import styles from "./Styles";
import {Section} from "./Section";
import {RuleTimeline} from "./RuleTimeLine";
import {SkuBreakdown} from "./SkuBreakdown";
import {DPSection} from "./DPSection";

export function RuleInspector({ trace }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Rule Inspector</h1>

            <Section title="Rule Execution">
                <RuleTimeline events={trace.events} />
            </Section>

            <Section title="SKU Breakdown">
                <SkuBreakdown skuTraces={trace.skuTraces} />
            </Section>

            <Section title="Dynamic Programming Paths">
                <DPSection dpTraces={trace.dpTraces} />
            </Section>

            <Section title="Final Total">
                <div style={styles.total}>{trace.finalTotal} kr</div>
            </Section>
        </div>
    );
}