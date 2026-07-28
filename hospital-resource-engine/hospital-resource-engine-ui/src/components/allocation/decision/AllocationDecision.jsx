import {TraceRow} from "./TraceRow";
import {ResourceRow} from "./ResourceRow";
import {PatientRow} from "./PatientRow";

export function AllocationDecision({ decision, patient, resources }) {
    let resourceId = decision.resourceId;

    return (
        <div className="panel">
            <h3>Result: </h3>

            <div className="allocation-decision">
                <div className="allocation-row">
                    <span className="label">Status:</span>

                    <span className={getStatusClass(decision.status)}>
                        {decision.status}
                    </span>
                </div>

                <PatientRow patient={patient} decision={decision}/>

                {resourceId && (
                    <ResourceRow resourceId={resourceId} resources={resources}/>
                )}

                <TraceRow trace={decision.trace} />
            </div>
        </div>
    )
}

function getStatusClass(status) {
    let statusClass = " " + status.toLowerCase();

    return "allocation-status" + statusClass;
}