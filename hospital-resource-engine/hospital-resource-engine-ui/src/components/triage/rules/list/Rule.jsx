import {getLevelIcon} from "../levels";
import {truncatedIdWithIcon} from "../../../general/ids";

export function Rule({ rule, onSelect }) {
    return (
        <div className="rule-row" onClick={() => onSelect(rule)}>
            <LevelIcon result={rule.result} />

            <div className="rule-main">
                <span className="rule-name">{rule.name}</span>
                <span className="rule-description">{rule.description}</span>
            </div>

            <div className="rule-level">{rule.result}</div>

            <div className="rule-id" title={rule.id}>
                {truncatedIdWithIcon(rule.id)}
            </div>
        </div>
    )
}

function LevelIcon({ result }) {
    let levelClass = " level-" + result.toLowerCase();

    return (
        <div className={"rule-icon" + levelClass}>
            {getLevelIcon(result)}
        </div>
    )
}