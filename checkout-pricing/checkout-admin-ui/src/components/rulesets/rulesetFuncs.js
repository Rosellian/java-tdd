export const DEFAULT_RULESETS = [
    {id: crypto.randomUUID(), name: "default", version: "v1"},
    {id: crypto.randomUUID(), name: "campaignA", version: "v1"},
    {id: crypto.randomUUID(), name: "campaignB", version: "v1"},
    {id: crypto.randomUUID(), name: "noCrossNoSkuDiscount", version: "v1"}];

export function createNewRulesetDraft() {
    return {
        id: crypto.randomUUID(),
        name: "NewRuleset",
        version: "v1",
        rules: [
            {
                type: "SpecialPrice",
                name: "New Rule",
                sku: "",
                quantity: 1,
                price: 0,
                priority: 1,
                stackable: false
            }
        ]
    };
}

export function createEntry(ruleset) {
    return {
        id: ruleset.id,
        name: ruleset.name,
        version: ruleset.version
    };
}

export function isEqualRuleset(a, b) {
    if (!a || !b) return false;

    if (a.name !== b.name) return false;

    if (a.rules.length !== b.rules.length) return false;

    for (let i = 0; i < a.rules.length; i++) {
        let ruleA = a.rules[i];
        let ruleB = b.rules[i];

        if(!isEqualRule(ruleA, ruleB)) return false;
    }

    return true;
}

export function smartIsEqualRuleset(a, b) {
    if (!a || !b) return false;

    if (a.name !== b.name) return false;

    const mapA = indexRules(a.rules);
    const mapB = indexRules(b.rules);

    if (mapA.size !== mapB.size) return false;

    for (let [id, ruleA] of mapA.entries()) {
        let ruleB = mapB.get(id);
        if (!ruleB) return false;

        if (!isEqualRule(ruleA, ruleB)) return false;
    }

    return true;
}

function isEqualRule(a, b) {

    return (
        a.type === b.type &&
        a.name === b.name &&
        a.sku === b.sku &&
        a.quantity === b.quantity &&
        a.price === b.price &&
        a.priority === b.priority &&
        a.stackable === b.stackable
    );
    //TODO add type specific comparison
}

export function indexRules(rules) {
    let map = new Map();
    for (let rule of rules) {
        map.set(rule.id, rule);
    }

    return map;
}