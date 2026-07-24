export function getLevelIcon(level) {
    switch (level) {
        case "RED": return "🔴";
        case "ORANGE": return "🟠";
        case "YELLOW": return "🟡";
        case "GREEN": return "🟢";
        default: return "⚪";
    }
}