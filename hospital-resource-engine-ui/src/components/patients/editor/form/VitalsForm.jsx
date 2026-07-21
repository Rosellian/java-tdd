import {Field} from "./Field";
import {Collapsible} from "../../../../ui/collapsible/Collapsible";

export function VitalsForm({ vitals, onUpdate }) {
    return (
        <Collapsible title="Vitals">
            <div className="vitals-grid">
                <div className="grid">
                    <Field label="Heart Rate" name="heartRate" value={vitals.heartRate} onUpdate={onUpdate} />

                    <Field label="Systolic BP" name="systolicBP" value={vitals.systolicBP} onUpdate={onUpdate} />

                    <Field label="Diastolic BP" name="diastolicBP" value={vitals.diastolicBP} onUpdate={onUpdate} />
                    
                    <Field label="Oxygen Saturation" name="oxygenSaturation" value={vitals.oxygenSaturation}
                           onUpdate={onUpdate} />

                    <Field label="Temperature" name="temperature" value={vitals.temperature} step="0.1"
                           onUpdate={onUpdate} />
                </div>
            </div>
        </Collapsible>
    )
}