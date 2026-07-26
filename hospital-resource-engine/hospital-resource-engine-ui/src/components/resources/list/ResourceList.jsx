import {Resource} from "./Resource";

export function ResourceList({ resources, selected, onSelect }) {
    return (
        <div className="panel">
            <h2>Resources ({resources.length})</h2>

            <div className="list-scroll">
                <ul>
                    {resources.map(resource => (
                        <li key={resource.id} className={selectedClass(resource, selected)}>
                            <Resource resource={resource} onSelect={onSelect} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function selectedClass(resource, selected) {
    return resource.id === selected?.id ? "selected" : "";
}