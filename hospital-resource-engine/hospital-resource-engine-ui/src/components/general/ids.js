export function truncatedIdWithIcon(id) {
    return "🔑 " + truncate(id);
}

function truncate(id) {
    if(id.length > 8) {
        return id.substring(0, 4) + "…" + id.substring(id.length - 4);
    }

    return id;
}