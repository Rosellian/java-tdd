import {useState} from "react";
import {runAllocation} from "../../api/allocation/allocation";
import {AllocationDecision} from "./decision/AllocationDecision";
import {PatientInfo} from "../patients/info/PatientInfo";

export function AllocationPanel({ patient, resources, onUpdate }) {
    const [result, setResult] = useState(null);
    const [resultPatient, setResultPatient] = useState(null);

    async function handleAllocation() {
        let res = await runAllocation(patient, resources);

        let updatedPatient = {...patient, history: addTraceHistory(patient, res) };

        setResult(res);
        setResultPatient(updatedPatient);
        onUpdate(updatedPatient);
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

function addTraceHistory(patient, res) {
    return [
        ...(patient.history ?? []),
        {
            type: "ALLOCATION",
            status: res.status,
            resourceId: res.resourceId,
            trace: res.trace,
            timestamp: new Date().toISOString()
        }
    ];
}