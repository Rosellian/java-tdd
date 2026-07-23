import {Collapsible} from "../../../ui/collapsible/Collapsible";
import {ResourceForm} from "./form/ResourceForm";

export function ResourceEditor({ resource, onChange, onCreate }) {
    async function handleCreate() {
        let newResource = {
            id: crypto.randomUUID(),
            type: "",
            capacity: 1,
            used: 0
        };

        onCreate(newResource);
    }

    return (
        <div className="panel">
            <Collapsible title="Editor">
                {resource && (
                    <div>
                        <ResourceForm resource={resource} onChange={onChange} />
                    </div>
                )}

                <button onClick={handleCreate}>
                    Create new resource
                </button>
            </Collapsible>
        </div>
    )
}