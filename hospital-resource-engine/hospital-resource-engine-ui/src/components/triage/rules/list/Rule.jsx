export function Rule({ rule, onSelect }) {
    return (
        <div className="rule-row" onClick={() => onSelect(rule)}>
            <LevelIcon result={rule.result} />

            <div className="rule-main">
                <span className="rule-name">{rule.name}</span>
                <span className="rule-description">{rule.description}</span>
            </div>

            <div className="rule-level">{rule.result}</div>
            <div className="rule-id">#{rule.id}</div>
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

function getLevelIcon(level) {
    switch (level) {
        case "RED": return "🔴";
        case "ORANGE": return "🟠";
        case "YELLOW": return "🟡";
        case "GREEN": return "🟢";
        default: return "⚪";
    }
}