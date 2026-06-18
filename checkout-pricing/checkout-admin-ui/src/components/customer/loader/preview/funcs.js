export function diffCustomer(current, incoming) {
    const changes = [];

    function walk(path, a, b) {
        if (typeof a !== typeof b) {
            changes.push({ path, from: a, to: b });
            return;
        }

        if (a && typeof a === "object" && !Array.isArray(a)) {
            const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
            keys.forEach(key => walk([...path, key], a[key], b[key]));
            return;
        }

        if (Array.isArray(a) && Array.isArray(b)) {
            if (JSON.stringify(a) !== JSON.stringify(b)) {
                changes.push({ path, from: a, to: b });
            }
            return;
        }

        if (a !== b) {
            changes.push({ path, from: a, to: b });
        }
    }

    walk([], current, incoming);
    return changes;
}