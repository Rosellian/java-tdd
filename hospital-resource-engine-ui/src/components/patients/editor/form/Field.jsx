export function Field({ label, name, value, step = "1", onUpdate }) {
    return (
        <div className="field">
            <label>{label}</label>

            <input type="number" step={step} value={value}
                   onChange={e => onUpdate(name, Number(e.target.value))}
            />
        </div>
    )
}