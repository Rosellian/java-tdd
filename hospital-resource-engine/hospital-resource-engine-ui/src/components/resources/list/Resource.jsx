import {getIcon} from "../types";
import {getFullClass} from "../resource";
import {truncatedIdWithIcon} from "../../general/ids";

export function Resource({ resource, onSelect }) {
    return (
        <div className={"resource-row" + getFullClass(resource)} onClick={() => onSelect(resource)}>
            <div className="resource-icon">{getIcon(resource.type)}</div>

            <div className="resource-main">
                <span className="resource-type">{resource.type}</span>
                <span className="resource-usage">
                    {resource.used}/{resource.capacity}
                </span>
            </div>

            <div className="resource-id" title={resource.id}>
                {truncatedIdWithIcon(resource.id)}
            </div>
        </div>
    )
}