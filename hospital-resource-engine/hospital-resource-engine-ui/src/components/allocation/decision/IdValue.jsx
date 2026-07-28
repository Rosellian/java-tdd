import {Tooltip} from "../../../ui/tooltip/Tooltip";
import {truncatedIdWithIcon} from "../../general/ids";

//TODO Use as a general component?
export function IdValue({ id }) {
    return (
        <Tooltip text={id}>
            <span className="value">
                {truncatedIdWithIcon(id)}
            </span>
        </Tooltip>
    )
}