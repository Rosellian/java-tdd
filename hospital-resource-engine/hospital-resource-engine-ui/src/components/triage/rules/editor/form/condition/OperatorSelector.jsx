export function OperatorSelector({ selected, locked = false, onSelect }) {
    if(locked) {
        return (
            <div className="field">
                <label>Operator</label>
                <div className="static-value">contains</div>
            </div>
        )
    }

    const operators = [
        "<",
        ">",
        "<=",
        ">=",
        "==",
        "contains"
    ];

    return (
        <div className="field">
            <label>Operator</label>

            <select value={selected} onChange={e => onSelect(e.target.value)}>
                {operators.map((operator, i) => (
                    <option key={i} value={operator}>
                        {operator}
                    </option>
                ))}
            </select>
        </div>
    )
}