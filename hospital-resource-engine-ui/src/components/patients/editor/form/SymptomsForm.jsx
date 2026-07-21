export function SymptomsForm({ draft, updateField }) {
    let value = draft.symptoms.join(", ");

    return (
        <div className="row">
            <div className="field">
                <label>Symptoms (comma separated)</label>

                <input value={value} onChange={e =>
                    updateField("symptoms", separateSymptoms(e.target.value))}
                />
            </div>
        </div>
    )
}

function separateSymptoms(commaSeparatedSymptoms) {
    return commaSeparatedSymptoms.split(",")
        .map(s => s.trim())
}