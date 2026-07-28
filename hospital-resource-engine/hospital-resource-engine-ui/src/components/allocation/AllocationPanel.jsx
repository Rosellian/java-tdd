import {useState} from "react";
import {runAllocation} from "../../api/allocation/allocation";
import {AllocationDecision} from "./decision/AllocationDecision";

export function AllocationPanel({ patient, resources }) {
    const [result, setResult] = useState(null);
    const [resultPatient, setResultPatient] = useState(null);

    async function handleAllocation() {
        let res = await runAllocation(patient, resources);
        setResult(res);
        setResultPatient(patient);
    }

    let patientName = resultPatient?.name ?? "";

    return (
        <div className="panel">
            <h2>Resource allocation: {patientName}</h2>

            <button onClick={handleAllocation}>
                Run Allocation
            </button>

            {result && (
                <AllocationDecision decision={result} patient={patient} resources={resources} />
            )}
        </div>
    )
}