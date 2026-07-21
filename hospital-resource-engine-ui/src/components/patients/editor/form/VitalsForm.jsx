import {Field} from "./Field";
import {Collapsible} from "../../../../ui/collapsible/Collapsible";

export function VitalsForm({ vitals, onUpdate }) {
    let danger = dangerClass(vitals);
    let atLeastOneDanger = anyDanger(danger);
    let addDangerClass = { class: " danger", add: atLeastOneDanger };

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

//TODO centralize, and build upon rules?
function dangerClass(vitals) {
    return {
        heartRate: setDanger(vitals.heartRate > 130),
        systolicBP: setDanger(vitals.systolicBP > 180),
        diastolicBP: setDanger(vitals.diastolicBP > 120),
        oxygenSaturation: setDanger(vitals.oxygenSaturation < 90),
        temperature: setDanger(vitals.temperature > 39)
    };
}

function setDanger(condition) {
    return condition ? " danger" : "";
}

function anyDanger(danger) {
    return Object.values(danger).some(x => x === " danger");
}