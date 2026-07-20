export function Inputs({ selected, onUpdate }) {
    return (
        <div>
            <Field label="List Name" name="name" value={selected.name} onChange={onUpdate} />

            <Field label="Version" name="version" value={selected.version} onChange={onUpdate} />
        </div>
    )
}

function Field({ label, name, value, onChange }) {
    return (
        <div className="field">
            <label>{label}</label>

            <input value={value} onChange={e => onChange(name, e.target.value)} />
        </div>
    )
}