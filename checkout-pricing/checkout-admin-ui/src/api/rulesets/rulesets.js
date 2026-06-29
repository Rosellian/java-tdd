const BASE_PATH = "/api/rulesets";

export async function getRulesetNames() {
    try {
        const res = await fetch(BASE_PATH);

        if (!res.ok) {
            console.error("Failed to load ruleset names:", res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("Error loading ruleset names:", err);
        return null;
    }
}

export async function getRuleset(name) {
    try {
        const res = await fetch(`${BASE_PATH}/${name}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        logError("load", err);
        return null;
    }
}

export async function saveRuleset(name, ruleset) {
    try {
        const res = await fetch(`${BASE_PATH}/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(ruleset)
        });

        return res.ok;
    } catch (err) {
        logError("save", err)
        return false;
    }
}

export async function deleteRuleset(name) {
    try {
        //TODO not needed when switching to id as primary key
        const encodedName = encodeURIComponent(name.replaceAll(" ", ""));

        const res = await fetch(`${BASE_PATH}/${encodedName}`, { method: "DELETE" });

        return res.ok;
    } catch (err) {
        logError("delete", err);
        return false;
    }
}

function logError(operation, err) {
    console.error(`Failed to ${operation} ruleset:`, err);
}