import {useState} from "react";
import {runTriage} from "../../api/triage/triage";
import {TraceTimeline} from "./TraceTimeline";

export function TriagePanel({ patient, onUpdate }) {
    const [result, setResult] = useState(null);
    const [resultPatient, setResultPatient] = useState(null);

    async function handleTriage() {
        let res = await runTriage(patient);
        setResult(res);

        let updatedPatient = {...patient, triageLevel: res.level};
        setResultPatient(updatedPatient);
        onUpdate(updatedPatient);
    }

    let patientName = resultPatient?.name ?? "";

    return (
        <div className="panel">
            <h2>Triage: {patientName}</h2>

            <button onClick={handleTriage}>
                Run Triage
            </button>

            {result && (
                <div className={getLevelClass(result.level)}>
                    <h3>Level: {result.level}</h3>
                    
                    <TraceTimeline steps={result.trace} />
                </div>
            )}
        </div>
    )
}

function getLevelClass(level) {
    let base = "triage-result";

    switch (level) {
        case "RED": return base + " triage-red";
        case "ORANGE": return base + " triage-orange";
        case "YELLOW": return base +  " triage-yellow";
        case "GREEN": return base +  " triage-green";
        default: return base;
    }
}