import {IdValue} from "./IdValue";

export function PatientRow({ patient, decision }) {
    return (
        <div className="allocation-row">
            <span className="label">Patient:</span>

            <span className="value">{patient.name}</span>

            <IdValue id={decision.patientId}/>
        </div>
    )
}