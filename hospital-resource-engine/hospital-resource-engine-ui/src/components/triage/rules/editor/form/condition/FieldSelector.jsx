export function FieldSelector({ selected, onSelect }) {
    const fields = [
        "vitals.heartRate",
        "vitals.systolicBP",
        "vitals.diastolicBP",
        "vitals.oxygenSaturation",
        "vitals.temperature",
        "symptoms"
    ];

    return (
        <div className="field">
            <label>Field</label>

            <select value={selected} onChange={e => onSelect(e.target.value)}>
                {fields.map((field, i) => (
                    <option key={i} value={field}>
                        {field}
                    </option>
                ))}
            </select>
        </div>
    )
}