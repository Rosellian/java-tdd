export async function getRulesetList() {
    try {
        const res = await fetch("/api/rulesets");

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

export async function getRulesetWithFallback(name) {
    const ruleset = await getRuleset(name);

    if(!ruleset) {
        return {ruleset: await importRuleset(name), fallback: true};
    }

    return {ruleset: ruleset, fallback: false};
}

async function importRuleset(name) {
    try {
        const sample = await import(`./samples/${name}.json`);
        return sample.default;
    } catch (err) {
        console.error("Sample ruleset load failed:", err);
        return null;
    }
}

export async function getRuleset(name) {
    try {
        const res = await fetch(`/api/rulesets/${name}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Failed to load ruleset:", err);
        return null;
    }
}

export async function saveRuleset(name, ruleset) {
    try {
        const res = await fetch(`/api/rulesets/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ruleset)
        });

        return res.ok;
    } catch (err) {
        console.error("Failed to save ruleset:", err);
        return false;
    }
}