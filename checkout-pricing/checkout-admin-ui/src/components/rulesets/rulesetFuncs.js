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

    //TODO implement rule comparison

    return true;
}