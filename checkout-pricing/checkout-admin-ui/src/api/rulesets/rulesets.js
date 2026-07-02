const BASE_PATH = "/api/rulesets";

export async function getRulesetEntries() {
    try {
        const res = await fetch(BASE_PATH);

        if (!res.ok) {
            console.error("Failed to load ruleset entries:", res.status);

            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("Error loading ruleset entries:", err);

        return null;
    }
}

export async function getRuleset(id) {
    try {
        const res = await fetch(`${BASE_PATH}/${id}`);
        if (!res.ok) return null;

        return await res.json();
    } catch (err) {
        logError("load", err);

        return null;
    }
}

export async function saveRuleset(ruleset) {
    try {
        const res = await fetch(`${BASE_PATH}/${ruleset.id}`, {
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

export async function deleteRuleset(id) {
    try {
        const res = await fetch(`${BASE_PATH}/${id}`, { method: "DELETE" });

        return res.ok;
    } catch (err) {
        logError("delete", err);

        return false;
    }
}

function logError(operation, err) {
    console.error(`Failed to ${operation} ruleset:`, err);
}