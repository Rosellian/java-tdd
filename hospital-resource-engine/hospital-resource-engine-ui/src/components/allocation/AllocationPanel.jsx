import {useState} from "react";
import {runAllocation} from "../../api/allocation/allocation";
import {Tooltip} from "../../ui/tooltip/Tooltip";
import {truncatedIdWithIcon} from "../general/ids";

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

function AllocationDecision({ decision, patient, resources }) {
    let resourceId = decision.resourceId;
    let resource = resources.find(r => r.id === resourceId);

    return (
        <div className="panel">
            <h3>Result: </h3>

            <div className="allocation-decision">
                <div className="allocation-row">
                    <span className="label">Status:</span>
                    <span className="value">{decision.status}</span>
                </div>

                <div className="allocation-row">
                    <span className="label">Patient:</span>

                    <span className="value">{patient.name}</span>

                    <Tooltip text={decision.patientId}>
                    <span className="value">
                        {truncatedIdWithIcon(decision.patientId)}
                    </span>
                    </Tooltip>
                </div>

                {resourceId && (
                    <div className="allocation-row">
                        <span className="label">Resource:</span>

                        <span className="value">{resource.type}</span>

                        <Tooltip text={resourceId}>
                            <span className="value">
                                {truncatedIdWithIcon(resourceId)}
                            </span>
                        </Tooltip>
                    </div>
                )}

                <div className="allocation-row">
                    <span className="label">Trace:</span>
                </div>

                <ul className="trace-list">
                    {decision.trace.map((step, i) => (
                        <li key={i}>
                            {/*TODO add type*/}
                            <strong>{step.label}</strong>: {step.detail}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}