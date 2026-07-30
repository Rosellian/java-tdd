import {useState} from "react";
import {runAllocation} from "../../api/allocation/allocation";
import {AllocationDecision} from "./decision/AllocationDecision";
import {PatientInfo} from "../patients/info/PatientInfo";

export function AllocationPanel({ patient, resources }) {
    const [result, setResult] = useState(null);
    const [resultPatient, setResultPatient] = useState(null);

    async function handleAllocation() {
        let res = await runAllocation(patient, resources);
        setResult(res);
        setResultPatient(patient);
    }

    return (
        <div className="panel">
            <h2>Resource allocation</h2>

            {resultPatient && (
                <div className="allocation-patient-row">
                    <h3>Patient:</h3>

                    <PatientInfo patient={resultPatient} />
                </div>
            )}

            <button onClick={handleAllocation}>
                Run Allocation
            </button>

            {result && (
                <AllocationDecision decision={result} patient={patient} resources={resources} />
            )}
        </div>
    )
}