import {TriageBadge} from "../../triage/TriageBadge";
import {truncatedIdWithIcon} from "../../general/ids";

export function PatientInfo({ patient }) {
    let id = truncatedIdWithIcon(patient.id);

    return (
        <div className="patient-info">
            <div className="patient-header">
                <span className="patient-icon">🧍️</span>

                <span className="patient-name">{patient.name}</span>

                <span className="patient-age">({patient.age})</span>

                <TriageBadge level={patient.triageLevel} />
            </div>

            <div className="patient-id">
                ID: <span className="id-value">{id}</span>
            </div>
        </div>
    )
}