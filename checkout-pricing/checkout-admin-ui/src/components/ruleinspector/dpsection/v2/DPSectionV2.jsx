import {Section} from "../../../../ui/Section";
import {DPTraceBlock} from "./traceblock/DPTraceBlock";

export function DPSectionV2({ dpTraces, debuggerDPTraces }) {
    let debuggerDPBySku = groupBySku(debuggerDPTraces);

    return (
        <Section title="Dynamic Programming Paths">
            {dpTraces.map((dpTrace, i) => {
                let debuggerDP = debuggerDPBySku[dpTrace.sku];

                return <DPTraceBlock key={i} dp={dpTrace} debuggerDP={debuggerDP} />
            })}
        </Section>
    )
}

export function groupBySku(debuggerDP) {
    return debuggerDP.reduce((acc, node) => {
        if (!acc[node.sku]) acc[node.sku] = [];
        acc[node.sku].push(node);
        return acc;
    }, {});
}