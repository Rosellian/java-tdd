import {Field} from "../../../../general/form/Field";
import {Collapsible} from "../../../../../ui/collapsible/Collapsible";
import {createAddDangerClass, dangerClass} from "./vitals";

export function VitalsForm({ vitals, onUpdate }) {
    let danger = dangerClass(vitals);
    let addDangerClass = createAddDangerClass(danger);

    return (
        <Collapsible title="Vitals" defaultOpen={true} closedClass={addDangerClass}>
            <div className="vitals-grid">
                <div className="grid">
                    <Field label="❤️ Heart Rate" name="heartRate" value={vitals.heartRate} className={danger.heartRate}
                           onUpdate={onUpdate} />

                    <Field label="🔼 Systolic BP" name="systolicBP" value={vitals.systolicBP}
                           className={danger.systolicBP} onUpdate={onUpdate} />

                    <Field label="🔽 Diastolic BP" name="diastolicBP" value={vitals.diastolicBP}
                           className={danger.diastolicBP} onUpdate={onUpdate} />

                    <Field label="🫁 Oxygen Saturation" name="oxygenSaturation" value={vitals.oxygenSaturation}
                           className={danger.oxygenSaturation} onUpdate={onUpdate} />

                    <Field label="🌡️ Temperature" name="temperature" value={vitals.temperature} step="0.1"
                           className={danger.temperature} onUpdate={onUpdate} />
                </div>
            </div>
        </Collapsible>
    )
}