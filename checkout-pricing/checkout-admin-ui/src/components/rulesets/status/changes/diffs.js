import {indexRules} from "../../functions/rulesetFuncs";
import {diffType} from "./typeDiffs";

export function diffRulesets(a, b) {
    if (!a || !b) return ["Ruleset missing"];

    let diffs = [];

    if (a.name !== b.name) {
        diffs.push(`Ruleset name changed (${a.name} → ${b.name})`);
    }

    const mapA = indexRules(a.rules);
    const mapB = indexRules(b.rules);

    removed(mapA, mapB, diffs);

    added(mapB, mapA, diffs);

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

function removed(mapA, mapB, diffs) {
    for (let [id, ruleA] of mapA.entries()) {
        if (!mapB.has(id)) {
            diffs.push(`Rule removed: ${ruleA.name}`);
        }
    }
}

function added(mapB, mapA, diffs) {
    for (let [id, ruleB] of mapB.entries()) {
        if (!mapA.has(id)) {
            diffs.push(`Rule added: ${ruleB.name}`);
        }
    }
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
    if (a.priority !== b.priority) diffs.push(`Priority changed (${a.priority} → ${b.priority})`);
    if (a.stackable !== b.stackable) diffs.push(`Stackable changed (${a.stackable} → ${b.stackable})`);

    diffType(a, b, diffs);

    return diffs;
}