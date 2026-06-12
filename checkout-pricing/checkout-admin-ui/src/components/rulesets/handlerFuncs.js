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

export function getInitialState(setRulesetNames, setFallbackUsed, setSelected, setMode) {
    getRulesetNames().then(list => {
        const names = list ?? DEFAULT_RULESETS;

        setRulesetNames(names);
        setFallbackUsed(!list);

        setSelected(names[0]);
        setMode("existing");
    });
}

export function updateState(mode, selected, setStatus, setRuleset, setFallbackUsed, onRulesetChange) {
    if (mode !== "existing" || !selected) return;

    setStatus("loading");

    getRulesetWithFallback(selected).then(({ruleset, fallback}) => {
        if (!ruleset) {
            setStatus("error");
            return;
        }

        if (!Array.isArray(ruleset.rules)) {
            ruleset.rules = [];
        }

        setRuleset(ruleset);
        setFallbackUsed(fallback);
        setStatus("idle");
        onRulesetChange(selected);
    });
}

export function updateRulesetNames(ruleset, newName, setRuleset, setRulesetNames, setSelected, onRulesetChange) {
    if (!ruleset) return;

    const updatedRuleset = {...ruleset, name: newName};
    setRuleset(updatedRuleset);

    setRulesetNames(prev =>
        prev.map(n => (n === ruleset.name ? newName : n))
    );

    setSelected(newName);
    onRulesetChange(newName); //TODO might need to become full ruleset later
}