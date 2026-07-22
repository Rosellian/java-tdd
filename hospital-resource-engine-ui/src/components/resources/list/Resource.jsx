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

function getIcon(type) {
    switch (type.toLowerCase()) {
        case "doctor": return "🩺";
        case "nurse": return "👩‍⚕️";
        case "icu_bed": return "💉";
        case "surgery_room": return "🔪";
        case "ventilator": return "🫁";
        case "ambulance": return "🚑";
        default: return "📦";
    }
}