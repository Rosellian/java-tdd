import {Section} from "../../../../ui/Section";
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {DPTraceBlock} from "./traceblock/DPTraceBlock";

export function DPSectionV2({ dpTraces, debuggerDPTraces }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    let debuggerDPBySku = groupBySku(debuggerDPTraces);

    return (
        <Section title="Dynamic Programming Paths">
            {dpTraces.map((dpTrace, i) => {
                let debuggerDP = debuggerDPBySku[dpTrace.sku];

                return <DPTraceBlock key={i} dp={dpTrace} debuggerDP={debuggerDP} isDark={isDark}/>
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