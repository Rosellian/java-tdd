export function Inputs({ selected, updateField }) {
    return (
        <div>
            <Field label="List Name" name="name" value={selected.name} onChange={updateField} />

            <Field label="Version" name="version" value={selected.version} onChange={updateField} />
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