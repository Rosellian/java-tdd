import {IdValue} from "./IdValue";
import {TriageBadge} from "../../triage/TriageBadge";

export function PatientRow({ patient, decision }) {
    return (
        <div className="allocation-row">
            <span className="label">Patient:</span>

            <span className="value">{patient.name}</span>

            <TriageBadge level={patient.triageLevel} />

            <IdValue id={decision.patientId}/>
        </div>
    )
}