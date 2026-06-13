import {Section} from "../../../ui/Section";
import {DPTraceView} from "./DPTraceView";

export function DPSection({ dpTraces }) {
    return (
        <Section title="Dynamic Programming Paths">
            <div>
                {dpTraces.map((dp, i) => (
                    <DPTraceView key={i} dp={dp} />
                ))}
            </div>
        </Section>
    );
}