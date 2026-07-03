import {indexRules} from "../../rulesetFuncs";

export function diffRulesets(a, b) {
    if (!a || !b) return [];

    let diffs = [];

    if (a.name !== b.name) diffs.push("Name changed");

    let max = Math.max(a.rules.length, b.rules.length);
    for (let i = 0; i < max; i++) {
        let ruleA = a.rules[i];
        let ruleB = b.rules[i];

        let ruleDiffs = diffRule(ruleA, ruleB);

        if(ruleDiffs.length > 0) {
            diffs.push(`Rule ${i + 1}:`);
            diffs.push(...ruleDiffs);
        }
    }

    return diffs;
}

export function smartDiffRulesets(a, b) {
    if (!a || !b) return ["Ruleset missing"];

    let diffs = [];

    if (a.name !== b.name) {
        diffs.push(`Ruleset name changed (${a.name} → ${b.name})`);
    }

    const mapA = indexRules(a.rules);
    const mapB = indexRules(b.rules);

    for (let [id, ruleA] of mapA.entries()) {
        if (!mapB.has(id)) {
            diffs.push(`Rule removed: ${ruleA.name}`);
        }
    }

    for (let [id, ruleB] of mapB.entries()) {
        if (!mapA.has(id)) {
            diffs.push(`Rule added: ${ruleB.name}`);
        }
    }

    for (let [id, ruleA] of mapA.entries()) {
        let ruleB = mapB.get(id);
        if (!ruleB) continue;

        let ruleDiffs = diffRule(ruleA, ruleB);
        if (ruleDiffs.length > 0) {
            diffs.push(`Rule changed: ${ruleA.name}`);
            diffs.push(...ruleDiffs);
        }
    }

    return diffs;
}

function diffRule(a, b) {
    let diffs = [];

    if (!a && b) {
        diffs.push(`Rule added: ${b.name}`);
        return diffs;
    }

    if (a && !b) {
        diffs.push(`Rule removed: ${a.name}`);
        return diffs;
    }

    if (a.type !== b.type) diffs.push(`Type changed (${a.type} → ${b.type})`);
    if (a.name !== b.name) diffs.push(`Name changed (${a.name} → ${b.name})`);
    if (a.sku !== b.sku) diffs.push(`SKU changed (${a.sku} → ${b.sku})`);
    if (a.quantity !== b.quantity) diffs.push(`Quantity changed (${a.quantity} → ${b.quantity})`);
    if (a.price !== b.price) diffs.push(`Price changed (${a.price} → ${b.price})`);
    if (a.priority !== b.priority) diffs.push(`Priority changed (${a.priority} → ${b.priority})`);
    if (a.stackable !== b.stackable) diffs.push(`Stackable changed (${a.stackable} → ${b.stackable})`);

    //TODO add type specific comparison

    return diffs;
}