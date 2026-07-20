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
    switch (level) {
        case "RED": return "triage-result triage-red";
        case "ORANGE": return "triage-result triage-orange";
        case "YELLOW": return "triage-result triage-yellow";
        case "GREEN": return "triage-result triage-green";
        default: return "triage-result";
    }
}