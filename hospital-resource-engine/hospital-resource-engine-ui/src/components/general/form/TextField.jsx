export function TextField({ label, name, value, className = "", readOnly = false, onUpdate }) {
    return (
        <div className={"field" + className}>
            <label>{label}</label>

            <input value={value} readOnly={readOnly}
                   onChange={e => onUpdate(name, e.target.value)}
            />
        </div>
    )
}