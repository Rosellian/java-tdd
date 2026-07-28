import {getIcon} from "../../resources/types";
import {IdValue} from "./IdValue";

export function ResourceRow({ resourceId, resources }) {
    let resource = resources.find(r => r.id === resourceId);

    return (
        <div className="allocation-row">
            <span className="label">Resource:</span>

            <span className="value">
                {getIcon(resource.type)}
            </span>

            <IdValue id={resourceId}/>
        </div>
    )
}