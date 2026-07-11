import {getRuleset} from "./rulesets";

export async function getRulesetWithFallback(entry) {
    const ruleset = await getRuleset(entry.id);

    if(!ruleset) {
        return {ruleset: await importRuleset(entry.name), fallback: true};
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