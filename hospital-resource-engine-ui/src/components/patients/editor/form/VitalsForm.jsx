export function VitalsForm({ vitals, onUpdate }) {
    return (
        <div>
            <h3>Vitals</h3>

            <div className="field">
                <label>Heart Rate</label>

                <input type="number" value={vitals.heartRate}
                       onChange={e => onUpdate("heartRate", Number(e.target.value))}
                />
            </div>

            <div className="field">
                <label>Systolic BP</label>

                <input type="number" value={vitals.systolicBP}
                       onChange={e => onUpdate("systolicBP", Number(e.target.value))}
                />
            </div>

            <div className="field">
                <label>Diastolic BP</label>

                <input type="number" value={vitals.diastolicBP}
                       onChange={e => onUpdate("diastolicBP", Number(e.target.value))}
                />
            </div>

            <div className="field">
                <label>Oxygen Saturation</label>

                <input type="number" value={vitals.oxygenSaturation}
                       onChange={e => onUpdate("oxygenSaturation", Number(e.target.value))}
                />
            </div>

            <div className="field">
                <label>Temperature</label>

                <input type="number" step="0.1" value={vitals.temperature}
                       onChange={e => onUpdate("temperature", Number(e.target.value))}
                />
            </div>
        </div>
    )
}