import {useState} from "react";
import {runTriage} from "../../api/triage/triage";
import {TraceTimeline} from "./TraceTimeline";

export function TriagePanel({ patient }) {
    const [result, setResult] = useState(null);

    async function handleTriage() {
        let res = await runTriage(patient);

        setResult(res);
    }

    return (
        <div className="panel">
            <h2>Triage: {patient.name}</h2>

            <button onClick={handleTriage}>Run Triage</button>

            {result && (
                <>
                    <h3>Level: {result.level}</h3>
                    <TraceTimeline steps={result.trace} />
                </>
            )}
        </div>
    )
}