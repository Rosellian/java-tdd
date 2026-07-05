export function updateRule(index, updatedRule, draft, setDraft, onChange) {
    const updatedRules = [...draft.rules];
    updatedRules[index] = updatedRule;

    const newDraft = { ...draft, rules: updatedRules };

    setDraft(newDraft);
    onChange?.(newDraft);
}

export function addRule(draft, setDraft, onChange, setSelectedRule) {
    const newRule = {type: "SpecialPrice", id: crypto.randomUUID(), name: "New Rule", sku: "", quantity: 1,
        price: 0, priority: 1, stackable: false};

    const newDraft = { ...draft, rules: [...draft.rules, newRule] };

    setDraft(newDraft);
    onChange?.(newDraft);
    setSelectedRule(newDraft.rules.length - 1);
}

export function deleteRule(index, draft, setDraft, onChange, setSelectedRule) {
    const updated = draft.rules.filter((_, i) => i !== index);

    const newDraft = { ...draft, rules: updated };

    setDraft(newDraft);
    onChange?.(newDraft);
    setSelectedRule(0);
}

export function getSafeIndex(selectedRule, draft) {
    return Math.min(selectedRule, draft.rules.length - 1);
}

export function cloneRule(rule, draft, ruleRefs, updateAfterClone) {
    const cloned = {
        ...rule,
        id: crypto.randomUUID(),
        name: rule.name + " (copy)"
    };

    const index = draft.rules.findIndex(r => r.id === rule.id);

    const newRules = [
        ...draft.rules.slice(0, index + 1),
        cloned,
        ...draft.rules.slice(index + 1)
    ];

    const updated = { ...draft, rules: newRules };

    updateAfterClone(index +1 , updated);

    focusOnClone(ruleRefs, cloned);
}

function focusOnClone(ruleRefs, clone) {
    setTimeout(() => {
        const el = ruleRefs.current[clone.id];
        if (!el) return;

        el.scrollIntoView({behavior: "smooth", block: "center"});

        el.classList.add("rule-highlight");
        setTimeout(() => el.classList.remove("rule-highlight"), 1200);

        const firstInput = el.querySelector("input, textarea, select");
        if (firstInput) firstInput.focus();
    }, 50);
}