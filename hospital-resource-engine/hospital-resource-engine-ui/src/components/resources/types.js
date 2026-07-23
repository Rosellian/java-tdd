export function getIcon(type) {
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