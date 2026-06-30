import {getRulesetNames} from "../../api/rulesets/rulesets";
import {getRulesetWithFallback} from "../../api/rulesets/rulesetsFallback";

export const DEFAULT_RULESETS = ["default", "campaignA", "campaignB", "noCrossNoSkuDiscount"];

export function createNewRulesetDraft() {
    return {
        name: "NewRuleset",
        version: 1,
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

export function initRulesets(setRulesetNames, setFallbackUsed, setStatus, initRuleset) {
    getRulesetNames().then(
        list => {
            let first = loadRulesetNames(list, setRulesetNames, setFallbackUsed);

            setStatus("loading");

            getRulesetWithFallback(first).then(
                ({ruleset, fallback}) =>
                    loadRuleset(ruleset, fallback, setStatus, initRuleset)
            );
        });
}

export function loadRulesetNames(list, setRulesetNames, setFallbackUsed) {
    let names = list ?? DEFAULT_RULESETS;

    setRulesetNames(names);
    setFallbackUsed(!list);

    return names[0];
}

function loadRuleset(ruleset, fallback, setStatus, initRuleset) {
    if (!ruleset) {
        setStatus("error");
        return;
    }

    if(!Array.isArray(ruleset.rules)) {
        ruleset.rules = [];
    }

    initRuleset(ruleset, fallback);
}

export function updateRulesetName(ruleset, newName, setRulesetNames) {
    if (!ruleset) return;

    let updated = {...ruleset, name: newName};

    setRulesetNames(prev => prev.map(n => (n === ruleset.name ? newName : n)));

    return updated;
}

export function updateRuleset(ruleset, setRuleset, setSelected, onRulesetChange) {
    setRuleset(ruleset);
    let name = ruleset.name;
    setSelected(name);
    onRulesetChange(name);
}

export function setLoadedRuleset(setOriginalRuleset, ruleset, setFallbackUsed, fallback) {
    setOriginalRuleset(ruleset);
    setFallbackUsed(fallback);
}

export function setChanges(setIsDraft, setUnsavedChanges, isUnsaved = false) {
    setIsDraft(isUnsaved);
    setUnsavedChanges(isUnsaved);
}

export function updateChanges(originalRuleset, updatedRuleset, setUnsavedChanges) {
    let noChanges = originalRuleset && isEqualRuleset(updatedRuleset, originalRuleset);
    setUnsavedChanges(!noChanges);
}

function isEqualRuleset(a, b) {
    if (!a || !b) return false;

    if (a.name !== b.name) return false;

    if (a.rules.length !== b.rules.length) return false;

    //TODO implement rule comparison

    return true;
}