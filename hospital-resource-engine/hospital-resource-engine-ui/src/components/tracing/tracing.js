export function getTraceIcon(type) {
    switch (type) {
        case "RULE_MATCH": return "📏";
        case "RESOURCE_OK": return "🟢";
        case "FALLBACK": return "🔁";
        case "NO_MATCH": return "⚪";
        default: return "📄";
    }
}