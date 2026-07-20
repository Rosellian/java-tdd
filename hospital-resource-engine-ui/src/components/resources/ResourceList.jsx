export function ResourceList({ resources, selected, onSelect }) {
    return (
        <div className="panel">
            <h2>Resources</h2>

            <ul>
                {resources.map(resource => (
                    <li key={resource.id} className={selectedClass(resource, selected)}>
                        <Resource resource={resource} onSelect={onSelect} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function selectedClass(resource, selected) {
    return resource.id === selected?.id ? "selected" : "";
}

function Resource({ resource, onSelect }) {
    return (
        <div onClick={() => onSelect(resource)}>
            <span>{resource.type}</span>
            <span>({resource.used}/{resource.capacity})</span>
            <span>ID: {resource.id}</span>
        </div>
    )
}