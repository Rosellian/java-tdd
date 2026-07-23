import {getIcon} from "../types";

export function Resource({ resource, onSelect }) {
    return (
        <div className="resource-row" onClick={() => onSelect(resource)}>
            <div className="resource-icon">{getIcon(resource.type)}</div>

            <div className="resource-main">
                <span className="resource-type">{resource.type}</span>
                <span className="resource-usage">
                    {resource.used}/{resource.capacity}
                </span>
            </div>

            <div className="resource-id">#{resource.id}</div>
        </div>
    )
}