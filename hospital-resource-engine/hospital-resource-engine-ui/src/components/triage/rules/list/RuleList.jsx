import {Rule} from "./Rule";

export function RuleList({ rules, selected, onSelect }) {
    return (
        <div className="panel">
            <h2>Rules</h2>

            <div className="list-scroll">
                <ul>
                    {rules.map(rule => (
                        <li key={rule.id} className={selectedClass(rule, selected)}>
                            <Rule rule={rule} onSelect={onSelect} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function selectedClass(rule, selected) {
    return rule.id === selected?.id ? "selected" : "";
}