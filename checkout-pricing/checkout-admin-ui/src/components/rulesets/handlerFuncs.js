import {getRulesetEntries} from "../../api/rulesets/rulesets";
import {getRulesetWithFallback} from "../../api/rulesets/rulesetsFallback";
import {createEntry, DEFAULT_RULESETS, isEqualRuleset} from "./rulesetFuncs";

export function initRulesets(setRulesetEntries, setFallbackUsed, setStatus, initRuleset) {
    getRulesetEntries().then(
        list => {
            let first = loadRulesetEntries(list, setRulesetEntries, setFallbackUsed);

            setStatus("loading");

            getRulesetWithFallback(first).then(
                ({ruleset, fallback}) =>
                    loadRuleset(ruleset, fallback, setStatus, initRuleset)
            );
        });
}

export function loadRulesetEntries(list, setRulesetEntries, setFallbackUsed) {
    let entries = list ?? DEFAULT_RULESETS;

    setRulesetEntries(entries);
    setFallbackUsed(!list);

    return entries[0];
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

export function updateRulesetName(ruleset, newName, setRulesetEntries) {
    if (!ruleset) return;

    let updated = {...ruleset, name: newName};

    setRulesetEntries(prev => prev.map(
        entry => (entry.id === ruleset.id ?
            {...entry, name: newName}
            : entry)
        )
    );

    return updated;
}

export function updateRuleset(ruleset, setRuleset, setSelected, onRulesetChange) {
    setRuleset(ruleset);
    let entry = createEntry(ruleset);
    setSelected(entry);
    onRulesetChange(entry);
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