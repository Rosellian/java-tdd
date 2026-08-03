import {TriageBadge} from "../../triage/TriageBadge";
import {truncatedIdWithIcon} from "../../general/ids";
import {Tooltip} from "../../../ui/tooltip/Tooltip";

export function Patient({ patient, onSelect }) {
    let triageLevel = patient.triageLevel ?? "UNTRIAGED";

    function onDragStart(e) {
        e.dataTransfer.setData("application/json", JSON.stringify(patient));

        addDragImage(patient, e);
    }

    let rowClass = `patient-row ${patient.__highlight ? "highlight" : ""}`;

    return (
        <div className={rowClass} onClick={() => onSelect(patient)} draggable onDragStart={onDragStart}>
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

function createDragImage(patient) {
    const ghost = document.createElement("div");
    ghost.className = "drag-ghost";
    ghost.innerHTML = `<div class="drag-ghost-inner">👤 ${patient.name} (${patient.age})</div>`;

    return ghost;
}

function addDragImage(patient, e) {
    const ghost = createDragImage(patient);
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);

    requestAnimationFrame(() => ghost.remove());
}