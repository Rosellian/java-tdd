import {TriageBadge} from "../../triage/TriageBadge";
import {truncatedIdWithIcon} from "../../general/ids";
import {Tooltip} from "../../../ui/tooltip/Tooltip";

export function Patient({ patient, onSelect }) {
    let triageLevel = patient.triageLevel ?? "UNTRIAGED";

    function onDragStart(e) {
        e.dataTransfer.setData("application/json", JSON.stringify(patient));
    }

    return (
        <div className="patient-row" onClick={() => onSelect(patient)} draggable onDragStart={onDragStart}>
            <Tooltip text={patient.id}>
                <span className="patient-id">
                    {truncatedIdWithIcon(patient.id)}
                </span>
            </Tooltip>

            <span className="patient-name">
                {patient.name} ({patient.age})
            </span>

            <span className="patient-level">
                {triageLevel}
            </span>

            <TriageBadge level={patient.triageLevel} />
        </div>
    )
}