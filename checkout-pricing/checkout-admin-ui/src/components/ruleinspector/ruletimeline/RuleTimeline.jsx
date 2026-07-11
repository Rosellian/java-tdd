import {Section} from "../../../ui/Section";
import {RuleEvent} from "./RuleEvent";

export function RuleTimeline({ events }) {
    return (
        <Section title="Rule Execution">
            <div>
                {events.map((e, i) => (
                    <RuleEvent key={i} event={e} index={i} />
                ))}
            </div>
        </Section>
    )
}